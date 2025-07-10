import {fetchStations} from "./api/all-stations.ts";
import {useEffect, useState} from "react";
import {AutocompleteInput} from "./components/autocomplete-input/autocomplete-input.tsx";
import {fetchSingleStation} from "./api/single-station.ts";
import {Calendar} from "./components/calendar/calendar.tsx";
import styles from './app.module.css';

function App() {
    const [stations, setStations] = useState([]);
    const [stationSuggestions, setStationSuggestions] = useState([]);
    const [choosenStation, setChoosenStation] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStations()
            .then(setStations)
            .catch(setError);
    }, []);

    if (error) return <p>Fehler: {error.message}</p>;

    const handleSuggestionClick = (suggestion) => {
        const stationId = suggestion.id;
        fetchSingleStation({stationId})
            .then(station => {
                setChoosenStation(station);
            })
            .catch(error => {
                console.error('Error fetching station details:', error);
            });
        setShowCalendar(true);
    }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.logo}>🚐</span>
        CAMPERVAN24
      </header>
        <main>
            <AutocompleteInput
                stations={stations}
                onSuggestionClick={handleSuggestionClick}
                stationSuggestions={stationSuggestions}
                setStationSuggestions={setStationSuggestions}
            />

            {showCalendar && <Calendar choosenStation={choosenStation}/>}
        </main>
    </div>
  );
}

export default App;

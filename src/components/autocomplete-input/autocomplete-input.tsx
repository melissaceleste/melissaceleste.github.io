import {useState} from "react";
import styles from "./autocomplete-input.module.css";
import {StationTypes} from "../../types/station.types";

interface Props {
    stations: StationTypes[];
    onSuggestionClick: (station: StationTypes) => void;
    stationSuggestions?: StationTypes[];
    setStationSuggestions?: (suggestions: StationTypes[]) => void;
}

export const AutocompleteInput = ({stations, onSuggestionClick, stationSuggestions, setStationSuggestions}: Props) => {
    const [activeStationId, setActiveStationId] = useState<string | null>(null);

    const handleAutoCompleteChange = (event) => {
        const inputValue = event.target.value.toLowerCase();
        const filteredStations = stations.filter(station => station.name.toLowerCase().includes(inputValue));
        setStationSuggestions(filteredStations);
    }

    return (
        <div className={styles.container}>
            <h2>Choose your station</h2>
            <input
                className={styles.input}
                placeholder={"Search for a station..."}
                type="text"
                list="stations"
                onChange={handleAutoCompleteChange}
            />
            {stationSuggestions.length > 0 && (
                <div className={styles.suggestionsContainer}>
                    {stationSuggestions.map(suggestion => (
                        <button
                            className={`${styles.suggestion} ${activeStationId === suggestion.id ? styles.isActive : ''}`}
                            key={suggestion.id}
                            onClick={() => {
                                setActiveStationId(suggestion.id);
                                onSuggestionClick(suggestion);
                            }}>
                            {suggestion.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

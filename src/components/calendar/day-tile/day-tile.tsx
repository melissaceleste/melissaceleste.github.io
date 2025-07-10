import styles from "./day-tile.module.css";

interface Props {
    day: Date;
    onClick: (customerName: string) => void;
    customerNames?: string[];
}

export const DayTile = ({ day, onClick, customerNames}: Props) => {
    const COLORS = [
        "#ffd6e0", "#b5ead7", "#c7ceea", "#ffdac1", "#e2f0cb", "#b5ead7", "#ffb7b2"
    ];
    return (
        <div className={styles.container}>
            <div className={styles.dayHeadline}>
                {day.toLocaleDateString('de-DE', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}
            </div>
            <div className={styles.customerNames}>
                {customerNames && customerNames.length > 0 ? (
                    customerNames.map((name, index) => (
                        <div
                            onClick={()=>onClick(name)}
                            key={index}
                            className={styles.customerName}
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        >
                        {name}
                    </div>
                    ))
                ) : (
                    <span className={styles.noBookings}>No bookings</span>
                )}
            </div>
        </div>
    );
}


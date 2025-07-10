interface Props {
    stationId: number;
}

export async function fetchSingleStation({stationId}: Props) {
    const response = await fetch(`https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/`);
    if (!response.ok) {
        throw new Error('Fehler beim Laden der einzelnen Station');
    }

    return await response.json();
}

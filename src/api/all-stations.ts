export async function fetchStations() {
    const response = await fetch('https://605c94c36d85de00170da8b4.mockapi.io/stations');

    if (!response.ok) {
        throw new Error('Fehler beim Laden der Stationen');
    }

    return await response.json();
}

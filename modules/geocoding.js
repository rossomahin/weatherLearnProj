async function getCoordinates(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;

    if (!city) {
        throw new Error("Город не найден")
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.length) {
        throw new Error(`Город ${city} не найден`);
    }

    const { lat, lon, name, country } = data[0];
    return { lat, lon, name, country }
}

export {getCoordinates};
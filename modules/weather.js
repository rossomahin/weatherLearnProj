const API_KEY = /* api_key from openweathermap.org */

async function getWeather(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    let response = await fetch(url);
    let data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    const weather = {
        city: data.name,
        temp: data.main.temp,
        condition: data.weather[0].main,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${(data.wind.speed * 3.6).toFixed(1)} km/h`
    };

    return weather
}


export {getWeather};

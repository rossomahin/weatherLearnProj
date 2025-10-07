const DEFAULT_CITY = "Moscow"

const WEATHER_ICONS = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Thunderstorm: "⛈️",
    Snow: "🌨️"
};

const ELEMENTS = {
    city:  document.getElementById('city'),
    temperature: document.getElementById('temperature'),
    ico: document.getElementById('conditionIco'),
    condition: document.getElementById('condition'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind')
};

export {DEFAULT_CITY, WEATHER_ICONS, ELEMENTS}
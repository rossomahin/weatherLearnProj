import { DEFAULT_CITY, WEATHER_ICONS, ELEMENTS } from "./modules/config.js";
import { getWeather } from "./modules/weather.js"
import { getCoordinates } from "./modules/geocoding.js";

document.addEventListener('DOMContentLoaded', () => render());

const input = document.getElementById('inputCity');
const controls = document.getElementById('controls');

async function showWeather(city) {
    if (!city) {
        throw new Error('Не указан город'); 
    }
    try {
        const { lat, lon, name } = await getCoordinates(city);
        const weather = await getWeather(lat, lon);
        return {name, weather};
    } catch (err) {
        console.log(err.message)
    }
}

function getInputValue() {
    let nameCity = input.value.trim() || DEFAULT_CITY;
    input.value = "";

    return nameCity;
}

function setValues(result) {
    const {name, weather} = result

    ELEMENTS.city.textContent = name;
    ELEMENTS.temperature.textContent = `${Math.round(weather.temp)}˚C`;
    ELEMENTS.ico.textContent = WEATHER_ICONS[weather.condition] || '⁇';
    ELEMENTS.condition.textContent = weather.condition;
    ELEMENTS.humidity.textContent = weather.humidity;
    ELEMENTS.wind.textContent = weather.windSpeed;
}

async function render(cityName = getInputValue()) {
    const result = await showWeather(cityName);
    
    if (!result || !result.weather) {
        ELEMENTS.city.textContent = "Ошибка загрузки"
        ELEMENTS.ico.textContent = "⚠️"
        return;
    } 

    setValues(result);
}

let autoUpdateEnabled = false;

let autoUpdateBtn = document.getElementById('autoUpdateBtn');
autoUpdateBtn.addEventListener('click', () => {
    autoUpdateEnabled = !autoUpdateEnabled;
    autoUpdateBtn.textContent = `Автообновление: ${autoUpdateEnabled ? '✅' : '❌'}`;

    if (autoUpdateEnabled) autoUpdate();
})

async function autoUpdate(interval = 60000) {
    if (!autoUpdateEnabled) return;

    await render();
    setTimeout(() => autoUpdate(interval), interval);
}

autoUpdate();

controls.addEventListener('click', handleEvent);
input.addEventListener('keydown', handleEvent);

function handleEvent(e) {
    let searchClick = e.type === 'click' && e.target.id === 'search';
    let searchEnter = e.type === 'keydown' && e.target.id === 'inputCity' && e.key === 'Enter';

    if (searchClick || searchEnter) render();
}
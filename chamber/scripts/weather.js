// select elements
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const weatherData = document.querySelector("#weather-stats");
const forecast = document.querySelector("#forecast");

// set api url
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=41.97&lon=-91.67&appid=4c2e12beb7028ac231383a2a42104b23&units=imperial'
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.97&lon=-91.67&appid=4c2e12beb7028ac231383a2a42104b23&units=imperial'

// api fetch function with error catch
async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


// run fetch
apiFetch(url);



// display weather api data for temperature and set icon
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}°F`;
    if (data.weather && data.weather[0]) {
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].description;
        captionDesc.textContent = data.weather[0].description;
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        weatherData.innerHTML = `High: ${data.main.temp_max}°F<br>Low: ${data.main.temp_min}°F<br>
        Humidity: ${data.main.humidity}%<br>Sunrise: ${sunrise.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}<br>Sunset: ${sunset.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}`;
    }

}


// display 3 day forecast
function displayForecast(data) {
    
}
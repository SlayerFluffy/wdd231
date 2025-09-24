// select elements
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const weatherData = document.querySelector("#weather-stats");
const forecast = document.querySelector("#forecast");

// set api url
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=41.97&lon=-91.67&appid=4c2e12beb7028ac231383a2a42104b23&units=imperial'
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.97&lon=-91.67&cnt=24&appid=4c2e12beb7028ac231383a2a42104b23&units=imperial'

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
};

async function forecastApiFetch(forecastURL) {
     try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const forecastData = await response.json();
            console.log(forecastData);
            displayForecast(forecastData);
        } else {
            throw new Error(await response.text());
         };
    } catch (error) {
        console.log(error);
    };
};

apiFetch(url);
forecastApiFetch(forecastURL);

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
    };
};


// display 3 day forecast
function displayForecast(data) {
    // here is where i am trying to start writing a function to display a 3 day forecast
    const day1 = [0, 1, 2, 3, 4, 5, 6, 7];
    const day2 = [8, 9, 10, 11, 12, 13, 14, 15];
    const day3 = [16, 17, 18, 19, 20, 21, 22, 23]

    function highAndLow(day) {
        // reset highs/lows for each day group
        let high = -Infinity;
        let low = Infinity;

        day.forEach(hour => {
            const entry = data.list && data.list[hour];
            if (!entry) return;
            const temp = entry.main.temp;
            if (temp > high) {
                high = temp;
            }
            if (temp < low) {
                low = temp;
            }
        });

        const firstEntry = data.list && data.list[day[0]];
        let dateText = '';
        if (firstEntry) {
            const d = new Date(firstEntry.dt_txt);
            const weekday = d.toLocaleDateString('en-US', { weekday: 'short' }); 
            const month = d.getMonth() + 1; 
            const dayNum = d.getDate();
            dateText = `${weekday} ${month}/${dayNum}`; 
        }
        return `${dateText} High: ${high.toFixed(0)}°F / Low: ${low.toFixed(0)}°F`;
    };

    let day1HighLow = document.createElement('p');
    let day2HighLow = document.createElement('p');
    let day3HighLow = document.createElement('p');
    day1HighLow.textContent = highAndLow(day1);
    day2HighLow.textContent = highAndLow(day2);
    day3HighLow.textContent = highAndLow(day3);

    forecast.appendChild(day1HighLow);
    forecast.appendChild(day2HighLow);
    forecast.appendChild(day3HighLow);
};
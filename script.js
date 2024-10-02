const apiKey = '300b02d251ab98b3c1a3cb5fd9aba801';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url, forecastUrl);
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(url, forecastUrl);
        }, () => {
            alert("Unable to retrieve location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchWeather(url, forecastUrl) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weatherData').innerHTML = `<p>City not found!</p>`;
            } else {
                const cityName = data.name;
                const countryCode = data.sys.country;
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                // Fetch country details using REST Countries API
                fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                    .then(countryResponse => countryResponse.json())
                    .then(countryData => {
                        const countryName = countryData[0].name.common;
                        const countryFlag = countryData[0].flags.svg;

                        document.getElementById('weatherData').innerHTML = `
                            <h2>${cityName}, ${countryName} <img src="${countryFlag}" alt="${countryName} flag" width="30px"/></h2>
                            <img src="${iconUrl}" alt="${description} icon" />
                            <p>Temperature: ${temp} °C</p>
                            <p>Weather: ${description}</p>
                            <p>Humidity: ${humidity}%</p>
                            <p>Wind Speed: ${windSpeed} m/s</p>
                            <hr class="separator"/>
                        `;

                        fetchForecast(forecastUrl);
                    })
                    .catch(countryError => {
                        console.error('Error fetching country data:', countryError);
                        document.getElementById('weatherData').innerHTML = `<p>There was an error fetching country data</p>`;
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').innerHTML = `<p>There was an error fetching the data</p>`;
        });
}

function fetchForecast(forecastUrl) {
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            let forecastHtml = '<h2>3 hour forecast</h2><div class="forecast-container">';
            data.list.slice(0, 5).forEach(forecast => {
                const time = forecast.dt_txt;
                const temp = forecast.main.temp;
                const humidity = forecast.main.humidity;
                const windSpeed = forecast.wind.speed;
                const description = forecast.weather.map(item => item.description).join(", ");
                const forecastIcon = forecast.weather[0].icon;
                const forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;

                forecastHtml += `
                    <div class="forecast-item">
                        <img src="${forecastIconUrl}" alt="Forecast icon" />
                        <p>${time}</p>
                        <p>${temp}°C</p>
                        <p>${description}</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    </div>
                `;
            });
            forecastHtml += '</div>';

            document.getElementById('weatherData').innerHTML += forecastHtml;
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}


// Initialize map with a default view
const map = L.map('map').setView([12.90, 122.56], 5.4);

// Adding OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    maxZoom: 18,
    attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
}).addTo(map);

// Adding OpenWeatherMap precipitation layer
const precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    maxZoom: 18,
    attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
}).addTo(map);

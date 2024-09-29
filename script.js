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
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                // Display current weather details with the icon on top
                document.getElementById('weatherData').innerHTML = `
                    <img src="${iconUrl}" alt="${description} icon" />
                    <p>Temperature: ${temp} °C</p>
                    <p>Weather: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <hr class="separator"/>
                `;

                // Fetch forecast data only after current weather is shown
                fetchForecast(forecastUrl);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').innerHTML = `<p>There was an error fetching the data</p>`;
        });
}

// Function to fetch forecast
function fetchForecast(forecastUrl) {
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Forecast Data:', data);
            let forecastHtml = '<h2>3 hour forecast</h2><div class="forecast-container">';
            data.list.slice(0, 5).forEach(forecast => {
                const time = forecast.dt_txt;
                const temp = forecast.main.temp;
                const humidity = forecast.main.humidity;
                const windSpeed = forecast.wind.speed;
                const description = forecast.weather.map(item => item.description).join(", ");
                const forecastIcon = forecast.weather[0].icon;
                const forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;

                // Structure each forecast item with icon on top, followed by details
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

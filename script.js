// Set the API key for OpenWeatherMap
const apiKey = '300b02d251ab98b3c1a3cb5fd9aba801';

// Function to get the weather information for the entered city
function getWeather() {
    const city = document.getElementById('cityInput').value; // Get city input from the user
    if (city === '') { // If city is empty, alert the user
        alert('Please enter a city name');
        return;
    }

    // Construct URLs for current weather and forecast based on city input
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch the weather data
    fetchWeather(url, forecastUrl);
}

// Function to get weather information based on the user's current location
function getWeatherByLocation() {
    if (navigator.geolocation) { // Check if the browser supports geolocation
        navigator.geolocation.getCurrentPosition(position => {
            // Retrieve latitude and longitude from user's current position
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Construct URLs for current weather and forecast based on user's coordinates
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            // Fetch the weather data using the URLs
            fetchWeather(url, forecastUrl);
        }, () => {
            alert("Unable to retrieve location."); // Handle location retrieval error
        });
    } else {
        alert("Geolocation is not supported by this browser."); // Handle case when geolocation is unsupported
    }
}

// Function to fetch weather data using the provided URLs
function fetchWeather(url, forecastUrl) {
    fetch(url)
        .then(response => response.json()) // Convert the response to JSON
        .then(data => {
            if (data.cod === '404') { // If city is not found, show an error message
                document.getElementById('weatherData').innerHTML = `<p>City not found!</p>`;
            } else {
                // Extract relevant weather data from the API response
                const cityName = data.name;
                const countryCode = data.sys.country;
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                // Fetch additional country information using the REST Countries API
                fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                    .then(countryResponse => countryResponse.json()) // Convert the response to JSON
                    .then(countryData => {
                        // Extract country details from the response
                        const countryName = countryData[0].name.common;
                        const countryFlag = countryData[0].flags.svg;

                        // Update the HTML with the weather data and country information
                        document.getElementById('weatherData').innerHTML = `
                        <div class="location-container">
                            <h2>${cityName} <sup class="country-code">${countryCode}</sup></h2>
                            <img src="${countryFlag}" alt="${countryName} flag" class="country-flag"/>
                        </div>
                        <div class="current-weather-container">
                            <img src="${iconUrl}" alt="${description} icon" class="weather-icon"/>
                            <p>${new Date().toLocaleString()}</p>
                            <p>${temp} °C</p>
                            <p>${description}</p>
                            <p>Humidity: ${humidity}%</p>
                            <p>Wind Speed: ${windSpeed} m/s</p>
                        </div>
                        <hr class="separator"/>
                    `;

                        // Fetch forecast data and update the HTML
                        fetchForecast(forecastUrl);
                    })
                    .catch(countryError => {
                        // Handle error in fetching country data
                        console.error('Error fetching country data:', countryError);
                        document.getElementById('weatherData').innerHTML = `<p>There was an error fetching country data</p>`;
                    });
            }
        })
        .catch(error => {
            // Handle error in fetching weather data
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').innerHTML = `<p>There was an error fetching the data</p>`;
        });
}

// Function to fetch weather forecast data using the provided forecast URL
function fetchForecast(forecastUrl) {
    fetch(forecastUrl)
        .then(response => response.json()) // Convert the response to JSON
        .then(data => {
            // Construct HTML for forecast display
            let forecastHtml = '<h2>3 hour forecast</h2><div class="forecast-container">';
            data.list.slice(0, 5).forEach(forecast => { // Limit to 5 forecast items
                const time = forecast.dt_txt;
                const temp = forecast.main.temp;
                const humidity = forecast.main.humidity;
                const windSpeed = forecast.wind.speed;
                const description = forecast.weather.map(item => item.description).join(", ");
                const forecastIcon = forecast.weather[0].icon;
                const forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;

                // Append each forecast item to the forecast HTML
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

            // Update the forecast data in the HTML
            document.getElementById('weatherData').innerHTML += forecastHtml;
        })
        .catch(error => {
            // Handle error in fetching forecast data
            console.error('Error fetching forecast data:', error);
        });
}

// Initialize the map with a default view and coordinates
const map = L.map('map').setView([12.90, 122.56], 5.4);

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add OpenWeatherMap cloud layer to the map
const weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    maxZoom: 18,
    attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
}).addTo(map);

// Add OpenWeatherMap wind layer to the map
const precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    maxZoom: 18,
    attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
}).addTo(map);

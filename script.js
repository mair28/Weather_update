const apiKey = '300b02d251ab98b3c1a3cb5fd9aba801';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weatherData').innerHTML = `<p>City not found!</p>`;
            } else {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                document.getElementById('weatherData').innerHTML = `
                    <p>Temperature: ${temp} °C</p>
                    <p>Weather: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').innerHTML = `<p>There was an error fetching the data</p>`;
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            let forecastHtml = '<h2>3-hour Forecast:</h2>';
            data.list.slice(0, 5).forEach(forecast => {
                const time = forecast.dt_txt;
                const temp = forecast.main.temp;
                const description = forecast.weather[0].description;
                forecastHtml += `<p>${time}: ${temp}°C, ${description}</p>`;
            });
            document.getElementById('weatherData').innerHTML += forecastHtml;
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const temp = data.main.temp;
                    const description = data.weather[0].description;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;
                    document.getElementById('weatherData').innerHTML = `
                        <p>Temperature: ${temp} °C</p>
                        <p>Weather: ${description}</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    document.getElementById('weatherData').innerHTML = `<p>There was an error fetching the data</p>`;
                });

            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    let forecastHtml = '<h2>3-hour Forecast:</h2>';
                    data.list.slice(0, 5).forEach(forecast => {
                        const time = forecast.dt_txt;
                        const temp = forecast.main.temp;
                        const description = forecast.weather[0].description;
                        forecastHtml += `<p>${time}: ${temp}°C, ${description}</p>`;
                    });
                    document.getElementById('weatherData').innerHTML += forecastHtml;
                })
                .catch(error => {
                    console.error('Error fetching forecast data:', error);
                });

        }, () => {
            alert("Unable to retrieve location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

const apiKey = '300b02d251ab98b3c1a3cb5fd9aba801';

        function getWeather() {
            const city = document.getElementById('cityInput').value;
            if (city === '') {
                alert('Please enter a city name');
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
        }
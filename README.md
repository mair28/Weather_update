Weather Update Application
This is a simple weather application that allows users to get current weather information and a 3-hour weather forecast for any city. The application uses the OpenWeatherMap API to fetch weather data and forecast details. It also includes the functionality to get weather data for the user’s current location using geolocation.

Features - City-based Weather Search: Users can input the name of a city to get the current weather and forecast.
Location-based Weather Search: Users can retrieve weather information based on their current geolocation.
3-Hour Forecast: Displays the forecast for the next 5 time intervals with temperature, humidity, wind speed, and weather descriptions.
Weather Icons: Weather conditions are displayed along with corresponding icons from OpenWeatherMap.
Responsive Design: The app is responsive and adjusts based on screen size.

Modifications
1. index.html [Updated]
Added: A search input for city-based weather queries.
Added: Buttons to fetch weather either by entering a city name or using the user's geolocation.

Integrated: The necessary script.js file to handle weather fetching and forecast display.
<div class="weather-container">
    <h1>Weather Update Today</h1>
    <p>Enter a city:</p>
    <input type="text" id="cityInput" placeholder="Enter city name">
    <button onclick="getWeather()">Get Weather</button>
    <button onclick="getWeatherByLocation()">Get Weather By Location</button>
    
    <div class="weather-data" id="weatherData">
    </div>
</div>

2. script.js [Updated]
Functionality: The script fetches weather data from the OpenWeatherMap API using both city input and geolocation.
Forecast: Fetches a 3-hour forecast for the next 5 periods and displays weather icons, temperatures, humidity, and wind speed.
Error Handling: Improved error handling for cases where the city is not found or location cannot be retrieved.

Key Functions:
getWeather(): Fetches weather by city.
getWeatherByLocation(): Fetches weather using geolocation.
fetchWeather(): Handles current weather fetching and passes the forecast URL to the forecast function.
fetchForecast(): Displays a 3-hour forecast for the next 5 time intervals, including icons and weather details.

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url, forecastUrl);
}

3. styles.css [Updated]
Styling: Added styles for the weather container and forecast display.
Scrollbar: The weather container includes a maximum height with a vertical scrollbar when the content exceeds the container’s height.
Flexbox Layout: Flexbox is used to display the forecast items in a horizontal row, with a responsive design for smaller screens.

Key Changes:
Weather container styling with auto-scroll for longer content:

.weather-container {
    background-color: rgb(56, 128, 223);
    padding: 30px;
    border-radius: 15px;
    width: 90%;
    max-height: 700px;
    overflow-y: auto;
}

Flex container for forecast items:
.forecast-container {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    overflow-x: auto;
}

How to Run:
Clone or download the repository.
Open index.html in a browser.
Enter a city name and click "Get Weather", or click "Get Weather By Location" for geolocation-based weather data.

Dependencies:
OpenWeatherMap API: Make sure to use your own API key by replacing the placeholder in script.js.

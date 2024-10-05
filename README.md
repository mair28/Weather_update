Weather Update Application
This is a simple weather application that allows users to get current weather information and a 3-hour weather forecast for any city. The application uses the OpenWeatherMap API to fetch weather data and forecast details. It also includes the functionality to get weather data for the user’s current location using geolocation.

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

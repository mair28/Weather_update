Weather Update Application
This is a simple web application that allows users to retrieve real-time weather data for any city, as well as their current location, using the OpenWeatherMap API. The application displays the current weather, along with a 3-hour forecast.

Features:
Search Weather by City: Users can input a city name to get the current weather details, including temperature, weather description, humidity, and wind speed.
Search Weather by Geolocation: Users can retrieve the weather for their current location using the browser's geolocation API.
3-Hour Forecast: In addition to current weather details, the application displays a short-term forecast for the next 3 hours.

1. index.html
This is the main structure of the web page, which includes:

A text input for entering a city name.
Two buttons:
"Get Weather" for searching by city name.
"Get Weather By Location" for retrieving weather based on geolocation.
A container where the weather data is dynamically displayed.

2. script.js
This JavaScript file contains the logic for fetching weather data from the OpenWeatherMap API and handling user input. The main functions include:

getWeather(): Fetches the current weather and a 3-hour forecast for a specified city.
getWeatherByLocation(): Uses the browser's geolocation API to fetch weather data for the user's current location, along with a 3-hour forecast.

3. styles.css
This file contains the styling for the web page:

Center-aligned content with a clean, modern look.
Weather data is displayed in a blue container with some padding and shadow effects for better visibility.
Dependencies
This application uses the OpenWeatherMap API to fetch weather data. You need to sign up for an API key at OpenWeatherMap.

How to Run:
Clone this repository.
Open the index.html file in your browser.
Enter a city name or use the "Get Weather By Location" button to retrieve weather data.
The current weather and 3-hour forecast will be displayed.

API Key
To use this app, you need an OpenWeatherMap API key. Replace the placeholder apiKey in script.js with your own key.

const apiKey = 'your_api_key_here';

Known Issues:  
The geolocation feature might not work if the browser blocks location access or if the user denies permission.
API requests are limited based on the OpenWeatherMap free tier restrictions.
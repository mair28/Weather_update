Weather Update Web Application
This weather application fetches and displays the current weather data for any city entered by the user. It uses the OpenWeatherMap API to get real-time weather information, including temperature, weather description, humidity, and wind speed.

Features:
User can input any city to get the weather data.
Displays temperature, weather condition, humidity, and wind speed.
Simple and clean user interface with responsive design.

Project Structure:

├── index.html
├── script.js
├── styles.css

1. index.html - This file contains the basic structure of the web page. It includes a text input for the user to enter a city name, a button to trigger the weather fetch process, and an area to display the fetched weather data.

Key sections:
The <input> field where the user can enter the city.
A button to trigger the getWeather() function.
A div with an id of weatherData, where the weather details are displayed after the API call.

2. script.js - This file contains the JavaScript logic for the application. It handles fetching the weather data from the OpenWeatherMap API using the city entered by the user.

Key components - API Key: The OpenWeatherMap API key used to authenticate the request.
getWeather() function: This function retrieves the city from the input field, constructs the API URL, and makes a fetch request to get the weather data.
If the city is found, it displays the temperature, weather condition, humidity, and wind speed in the weatherData div. If the city is not found, it shows an error message.

const apiKey = 'YOUR_API_KEY_HERE';

3. styles.css - This file contains the styles for the web page, making it look clean and presentable. The page is styled to be centered on the screen, and the weather data is displayed inside a card-like container.

Key styling:
.weather-container - The container that holds the weather data and form, styled with a box-shadow and padding.
.weather-data - Styles the weather information displayed to the user.
Overall, the CSS creates a neat and responsive design for the app.
How to Run the Application
Clone or download the project files.
Open the index.html file in a web browser.
Enter a city name in the input box and click "Get Weather."
The weather data will be fetched from the OpenWeatherMap API and displayed on the screen.

API Integration - This project uses the OpenWeatherMap API to fetch real-time weather data. You need an API key to access the data, which can be obtained by signing up on OpenWeatherMap. Replace the placeholder API key in script.js with your own key:

const apiKey = 'YOUR_API_KEY_HERE';

Known Issues - Make sure the entered city name is valid and spelled correctly.
There may be a delay if the network connection is slow.

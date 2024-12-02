const apiKey = "ad1b212bf3d02c08dd1a63ca9e1ebbfe"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const errorElement = document.querySelector(".error");
const weatherIconElement = document.querySelector(".weather-icon");
// const appElement = document.querySelector(".app");

const weatherIcons = {
  cold: "cold.png",
  moderate: "moderate.png",
  hot: "hot.png"
};

// const backgroundImages = {
//     cold: "url('bgcold.png')",
//     moderate: "url('path/to/moderate-background.jpg')",
//     hot: "url('path/to/hot-background.jpg')"
//   };

async function checkWeather() {
  const cityName = searchBox.value;
  if (!cityName) {
    showError("Please enter a city name");
    return; 
  }

  try {
    const response = await fetch(`${apiUrl}&units=metric&q=${cityName}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();

    console.log(data);

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + " km/h";

    const weatherCategory = getWeatherCategory(data.main.temp);
    weatherIconElement.src = weatherIcons[weatherCategory];
    // appElement.style.backgroundImage = backgroundImages[weatherCategory];
    // appElement.style.backgroundSize = "cover";
    

    errorElement.style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    showError("Error: Invalid city name or unable to fetch data");
  }
}

function getWeatherCategory(temperature) {
  if (temperature < 16) {
    return "cold";
  } else if (temperature < 30) {
    return "moderate";
  } else {
    return "hot";
  }
}





function showError(message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

searchBtn.addEventListener("click", checkWeather);
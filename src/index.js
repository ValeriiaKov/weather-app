let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekDays[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#today-time");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function changeCurrent(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°C`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
}
function getGeolocation(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "ae23c8dd3319699701cfabe88335a92f";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(changeCurrent);
}
function callNavigator() {
  navigator.geolocation.getCurrentPosition(getGeolocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", callNavigator);

function changeWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `${temperature}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
}
function changeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#searchcity-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchCity.value;
  let apiKey = "ae23c8dd3319699701cfabe88335a92f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(changeWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", changeCity);

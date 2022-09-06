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

function getCoords(coordinates) {
  let apiKey = "ae23c8dd3319699701cfabe88335a92f";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(showForecast);
}

function changeWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  celsiusTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp-value");
  currentTemp.innerHTML = celsiusTemp;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `$response.data.weather[0].main`);
  getCoords(response.data.coord);
}

function getGeolocation(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "ae23c8dd3319699701cfabe88335a92f";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(changeWeather);
}
function callNavigator() {
  navigator.geolocation.getCurrentPosition(getGeolocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", callNavigator);

function changeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#searchcity-input");
  let apiKey = "ae23c8dd3319699701cfabe88335a92f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(changeWeather);
}
let celsiusTemp = null;

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", changeCity);

function showFahreheitTemp(event) {
  event.preventDefault();
  let fahrenheitElement = Math.round((celsiusTemp * 9) / 5 + 32);
  let currentTemp = document.querySelector("#temp-value");
  currentTemp.innerHTML = fahrenheitElement;
  celsiusLink.classList.remove("activePage");
  fahrenheitLink.classList.add("activePage");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp-value");
  currentTemp.innerHTML = celsiusTemp;
  celsiusLink.classList.add("activePage");
  fahrenheitLink.classList.remove("activePage");
}

let fahrenheitLink = document.querySelector("#fahrenheit-temperature");
fahrenheitLink.addEventListener("click", showFahreheitTemp);

let celsiusLink = document.querySelector("#celsius-temperature");
celsiusLink.addEventListener("click", showCelsiusTemp);

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  return weekDays[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let weatherForecast = document.querySelector("#forecast");
  let forecastElement = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 4) {
      forecastElement =
        forecastElement +
        `<div class="col-3">
                  <div class="card weekcard">
                    <div class="card-body">
                      <p class="week">
                       <div class="day"> ${formatDay(day.dt)} </div>
                        <img
                          src="http://openweathermap.org/img/wn/${
                            day.weather[0].icon
                          }@2x.png"
                          alt="${day.weather[0].main}"
                          id="icon"
                          class="forecastImage"
                        />
                        <br /> 
                        <span class="temperature"> ${Math.round(
                          day.temp.day
                        )}°C</span>
                      </p>
                    </div>
                  </div>
                </div>
               `;
    }
  });
  forecastElement = forecastElement + `</div>`;
  weatherForecast.innerHTML = forecastElement;
}

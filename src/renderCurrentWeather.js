/* eslint-disable no-undef */
import moment from 'moment';
import getPosition from './position';
import { getCurrentWeather } from './getWeatherData';

export default async () => {
  const { city, country } = await getPosition();
  const weatherData = await getCurrentWeather();
  const now = moment();
  const timeandLocation = document.createElement('section');
  timeandLocation.classList.add('time-n-loc');

  const location = document.createElement('h1');
  location.textContent = `${city}, ${country}`;
  const time = document.createElement('p');
  time.textContent = now.format('ddd DD MMM, HH:mm');
  timeandLocation.appendChild(location);
  timeandLocation.appendChild(time);
  document.querySelector('body').appendChild(timeandLocation);

  const currentWeather = document.createElement('section');
  timeandLocation.classList.add('cur-weather');

  const temp = document.createElement('h1');
  temp.textContent = `${parseInt(weatherData.main.temp, 10)}°`;
  const summary = document.createElement('h2');
  summary.textContent = weatherData.weather[0].main;
  const icon = document.createElement('i');
  const iconSuffix = now.unix() > weatherData.sys.sunrise && now.unix() < weatherData.sys.sunset ? 'd' : 'n';
  icon.classList.add('owf');
  icon.classList.add(`owf-${weatherData.weather[0].id}-${iconSuffix}`);
  const feelLike = document.createElement('p');
  feelLike.textContent = `Feels like: ${parseInt(weatherData.main.feels_like, 10)}°`;
  const windSpeed = document.createElement('p');
  windSpeed.textContent = `Wind: ${weatherData.wind.speed} (m/s)`;
  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

  currentWeather.appendChild(temp);
  currentWeather.appendChild(summary);
  currentWeather.appendChild(icon);
  currentWeather.appendChild(feelLike);
  currentWeather.appendChild(windSpeed);
  currentWeather.appendChild(humidity);
  document.querySelector('body').appendChild(currentWeather);
  console.log(weatherData);
};


// current temperature - parseInt(data.main.temp)
// weather description(summary) - data.weather[0].main
// corresponding icon = data.weather[0].main.icon
// feels like temperature = parseInt(data.main.feels_like)
// wind speed(m/s) = data.wind.speed (m/s)?
//  humidity(%) - data.main.humidity
// weather icon  - https://websygen.github.io/owfont/#
/* eslint-disable no-undef */
import moment from 'moment';
import { getCity } from './position';
import getWeatherData from './getWeatherData';

const renderCurrentData = (current, city, country) => {
  const now = moment();
  const timeandLocation = document.createElement('section');
  timeandLocation.classList.add('time-n-loc');

  const location = document.createElement('h1');
  location.textContent = `${city}, ${country}`;
  const time = document.createElement('p');
  time.textContent = now.format('ddd DD MMMM HH:mm');
  timeandLocation.appendChild(location);
  timeandLocation.appendChild(time);
  document.querySelector('body').appendChild(timeandLocation);

  const currentWeather = document.createElement('section');
  timeandLocation.classList.add('cur-weather');

  const temp = document.createElement('h1');
  temp.textContent = `${parseInt(current.temp, 10)}°`;
  const summary = document.createElement('h2');
  summary.textContent = current.weather[0].main;
  const icon = document.createElement('i');
  const iconSuffix = now.unix() > current.sunrise && now.unix() < current.sunset ? 'd' : 'n';
  icon.classList.add('owf');
  icon.classList.add(`owf-${current.weather[0].id}-${iconSuffix}`);
  const feelLike = document.createElement('p');
  feelLike.textContent = `Feels like: ${parseInt(current.feels_like, 10)}°`;
  const windSpeed = document.createElement('p');
  windSpeed.textContent = `Wind: ${current.wind_speed} (m/s)`;
  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${current.humidity}%`;

  currentWeather.appendChild(temp);
  currentWeather.appendChild(summary);
  currentWeather.appendChild(icon);
  currentWeather.appendChild(feelLike);
  currentWeather.appendChild(windSpeed);
  currentWeather.appendChild(humidity);
  document.querySelector('body').appendChild(currentWeather);
};

const renderFutureForecast = (data) => {
  const wrapper = document.createElement('section')
  data.map((day, index) => {
    if (index > 0 && index < 4) {
      const dayContainer = document.createElement('div')
      const weekday = document.createElement('h3')
      weekday.textContent = moment.unix(day.dt).format('dddd')
      const temp = document.createElement('h2')
      temp.textContent = `${parseInt(day.temp.day, 10)}°`;
      const icon = document.createElement('i');
      icon.classList.add('owf');
      icon.classList.add(`owf-${day.weather[0].id}`);
      dayContainer.appendChild(weekday);
      dayContainer.appendChild(temp);
      dayContainer.appendChild(icon);
      wrapper.appendChild(dayContainer);
    }
  });
  document.querySelector('body').appendChild(wrapper);
};

export default async () => {
  const { city, country } = await getCity();
  const { current, daily } = await getWeatherData();
  renderCurrentData(current, city, country);
  renderFutureForecast(daily);
};


// current temperature - parseInt(data.main.temp)
// weather description(summary) - data.weather[0].main
// corresponding icon = data.weather[0].main.icon
// feels like temperature = parseInt(data.main.feels_like)
// wind speed(m/s) = data.wind.speed (m/s)?
//  humidity(%) - data.main.humidity
// weather icon  - https://websygen.github.io/owfont/#
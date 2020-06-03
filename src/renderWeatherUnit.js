/* eslint-disable no-undef */
import moment from 'moment';
import { getCity } from './position';
import getWeatherData from './getWeatherData';
import { tempUnit } from './controlUnit';

const celToFarConverter = (celcius) => celcius * 1.8 + 32;

const renderCurrentData = (current, city, country) => {
  const now = moment();
  const timeandLocation = document.createElement('section');
  timeandLocation.classList.add('time-n-loc');

  document.querySelector('#location').textContent = `${city}, ${country}`;
  document.querySelector('#time').textContent = now.format('ddd DD MMMM HH:mm');

  document.querySelector('#currentTemp').textContent = tempUnit === 'celcius' ? `${parseInt(current.temp, 10)}°C` : `${parseInt(celToFarConverter(current.temp), 10)}°F`;
  const iconSuffix = now.unix() > current.sunrise && now.unix() < current.sunset ? 'd' : 'n';
  document.querySelector('.temp-widget>i').classList.add(`owf-${current.weather[0].id}-${iconSuffix}`);

  document.querySelector('#summary').textContent = current.weather[0].main;
  document.querySelector('#feelsLike').textContent = `Feels like: ${tempUnit === 'celcius' ? `${parseInt(current.feels_like, 10)}°C` : `${parseInt(celToFarConverter(current.feels_like), 10)}°F`}`;
  document.querySelector('#wind').textContent = `Wind: ${current.wind_speed} (m/s)`;
  document.querySelector('#humidity').textContent = `Humidity: ${current.humidity}%`;
};

const renderFutureForecast = (data) => {
  data.map((day, index) => {
    if (index > 0 && index < 4) {
      document.querySelector(`#dailyWeat-${index}>h3`).textContent = moment.unix(day.dt).format('dddd');
      document.querySelector(`#dailyWeat-${index}>div>h2`).textContent = tempUnit === 'celcius' ? `${parseInt(day.temp.day, 10)}°C` : `${parseInt(celToFarConverter(day.temp.day), 10)}°F`;
      document.querySelector(`#dailyWeat-${index}>div>i`).classList.add(`owf-${day.weather[0].id}`);
    }
  });
};

export default async () => {
  const { city, country } = await getCity();
  const { current, daily } = await getWeatherData();
  renderCurrentData(current, city, country);
  renderFutureForecast(daily);
};

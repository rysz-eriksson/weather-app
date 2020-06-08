/* eslint-disable no-undef */
import moment from 'moment';
import { getCity, getCoords } from './position';
import getWeatherData from './getWeatherData';


const celToFarConverter = (celcius) => celcius * 1.8 + 32;

const renderTimeandLocation = (city, country, lang) => {
  const now = moment();
  now.locale(lang);
  document.querySelector('#location').textContent = `${city}, ${country}`;
  document.querySelector('#time').textContent = now.format('ddd DD MMMM HH:mm');
};

const renderCurrentData = (current, tempUnit, lang) => {
  const now = moment();
  document.querySelector('#currentTemp').textContent = tempUnit === 'celcius' ? `${parseInt(current.temp, 10)}°C` : `${parseInt(celToFarConverter(current.temp), 10)}°F`;
  const iconSuffix = now.unix() > current.sunrise && now.unix() < current.sunset ? 'd' : 'n';
  document.querySelector('.temp-widget>i').classList.add(`owf-${current.weather[0].id}-${iconSuffix}`);

  document.querySelector('#summary').textContent = current.weather[0].description;
  document.querySelector('#feelsLike').textContent = `${lang === 'en' ? 'Feels like' : 'Odczuwalna temperatura'}: ${tempUnit === 'celcius' ? `${parseInt(current.feels_like, 10)}°C` : `${parseInt(celToFarConverter(current.feels_like), 10)}°F`}`;
  document.querySelector('#wind').textContent = `${lang === 'en' ? 'Wind' : 'Wiatr'}: ${current.wind_speed} (m/s)`;
  document.querySelector('#humidity').textContent = `${lang === 'en' ? 'Humidity' : 'Wilgotność'}: ${current.humidity}%`;
};

const renderFutureForecast = (data, tempUnit, lang) => {
  data.map((day, index) => {
    if (index > 0 && index < 4) {
      document.querySelector(`#dailyWeat-${index}>h3`).textContent = moment.unix(day.dt).locale(lang).format('dddd');
      document.querySelector(`#dailyWeat-${index}>div>h2`).textContent = tempUnit === 'celcius' ? `${parseInt(day.temp.day, 10)}°C` : `${parseInt(celToFarConverter(day.temp.day), 10)}°F`;
      document.querySelector(`#dailyWeat-${index}>div>i`).classList.add(`owf-${day.weather[0].id}`);
    }
  });
};

export default async (search) => {
  const unit = localStorage.getItem('unit') ? localStorage.getItem('unit') : 'celcius';
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  const { city, country } = search ? await getCoords(search) : await getCity();
  const { current, daily } = await getWeatherData(search, lang);
  renderTimeandLocation(city, country, lang);
  renderCurrentData(current, unit, lang);
  renderFutureForecast(daily, unit, lang);
};

export { renderCurrentData, renderFutureForecast, renderTimeandLocation }
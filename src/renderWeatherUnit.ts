// render units with current and future daily forecast
import moment from 'moment';
import { lang, unit } from './models/lang-unit';
import {Current, Daily} from './models/weatherDataCall';
import { getCity } from './position';
import getWeatherData from './getWeatherData';


const celToFarConverter = (celcius: number) => celcius * 1.8 + 32;

const renderTimeandLocation = ( country: string, lang: lang, timezone: number, city?: string, town?: string, village?: string) => {
  const now = moment();
  document.querySelector('#location')!.textContent = `${city || town || village}, ${country}`;
  document.querySelector('#time')!.textContent = now.utcOffset(timezone / 60).locale(lang).format('ddd DD MMMM HH:mm');
};

const renderCurrentData = (current: Current, tempUnit: unit, lang: lang) => {
  const now = moment();
  document.querySelector('#currentTemp')!.textContent = tempUnit === 'celcius' ? `${Math.round(current.temp)}°C` : `${Math.round(celToFarConverter(current.temp))}°F`;
  const iconSuffix = now.unix() > current.sunrise && now.unix() < current.sunset ? 'd' : 'n';
  document.querySelector('.temp-widget>i')!.classList.add(`owf-${current.weather[0].id}-${iconSuffix}`);

  document.querySelector('#summary')!.textContent = current.weather[0].description;
  document.querySelector('#feelsLike')!.textContent = `${lang === 'en' ? 'Feels like' : 'Odczuwalna temperatura'}: ${tempUnit === 'celcius' ? `${Math.round(current.feels_like)}°C` : `${Math.round(celToFarConverter(current.feels_like))}°F`}`;
  document.querySelector('#wind')!.textContent = `${lang === 'en' ? 'Wind' : 'Wiatr'}: ${current.wind_speed} (m/s)`;
  document.querySelector('#humidity')!.textContent = `${lang === 'en' ? 'Humidity' : 'Wilgotność'}: ${current.humidity}%`;
};

const renderFutureForecast = (data: Daily[], tempUnit: unit, lang: lang) => {
  data.map((day: Daily, index: number) => {
    if (index > 0 && index < 4) {
      document.querySelector(`#dailyWeat-${index}>h3`)!.textContent = moment.unix(day.dt).locale(lang).format('dddd');
      document.querySelector(`#dailyWeat-${index}>h2`)!.textContent = tempUnit === 'celcius' ? `${Math.round(day.temp.day)}°C` : `${Math.round(celToFarConverter(day.temp.day))}°F`;
      document.querySelector(`#dailyWeat-${index}>i`)!.classList.add(`owf-${day.weather[0].id}`);
    }
  });
};

export default async () => {
  const unit: unit = localStorage.getItem('unit') ? (localStorage.getItem('unit')! as unit) : 'celcius';
  const lang: lang = localStorage.getItem('lang') ? (localStorage.getItem('lang')! as lang) : 'en';
  const { city, town, village, country } = await getCity();
  const { current, daily, timezone_offset } = await getWeatherData(lang);
  renderTimeandLocation(country, lang, timezone_offset, city, town, village);
  renderCurrentData(current, unit, lang);
  renderFutureForecast(daily, unit, lang);
};

export { renderCurrentData, renderFutureForecast, renderTimeandLocation }
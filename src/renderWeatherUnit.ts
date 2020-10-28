// render units with current and future daily forecast
import moment from 'moment';
import { lang, unit } from './models/lang-unit';
import { getCity } from './position';
import getWeatherData from './getWeatherData';


const celToFarConverter = (celcius: number) => celcius * 1.8 + 32;

const renderTimeandLocation = (city: string, town: string, village: string, country: string, lang: lang, timezone) => {
  const now = moment();
  document.querySelector('#location')!.textContent = `${city || town || village}, ${country}`;
  document.querySelector('#time')!.textContent = now.utcOffset(timezone / 60).locale(lang).format('ddd DD MMMM HH:mm');
};

const renderCurrentData = (current, tempUnit: unit, lang: lang) => {
  const now = moment();
  document.querySelector('#currentTemp')!.textContent = tempUnit === 'celcius' ? `${parseInt(current.temp, 10)}°C` : `${parseInt(celToFarConverter(current.temp), 10)}°F`;
  const iconSuffix = now.unix() > current.sunrise && now.unix() < current.sunset ? 'd' : 'n';
  document.querySelector('.temp-widget>i')!.classList.add(`owf-${current.weather[0].id}-${iconSuffix}`);

  document.querySelector('#summary')!.textContent = current.weather[0].description;
  document.querySelector('#feelsLike')!.textContent = `${lang === 'en' ? 'Feels like' : 'Odczuwalna temperatura'}: ${tempUnit === 'celcius' ? `${parseInt(current.feels_like, 10)}°C` : `${parseInt(celToFarConverter(current.feels_like), 10)}°F`}`;
  document.querySelector('#wind')!.textContent = `${lang === 'en' ? 'Wind' : 'Wiatr'}: ${current.wind_speed} (m/s)`;
  document.querySelector('#humidity')!.textContent = `${lang === 'en' ? 'Humidity' : 'Wilgotność'}: ${current.humidity}%`;
};

const renderFutureForecast = (data, tempUnit: unit, lang: lang) => {
  data.map((day, index) => {
    if (index > 0 && index < 4) {
      document.querySelector(`#dailyWeat-${index}>h3`)!.textContent = moment.unix(day.dt).locale(lang).format('dddd');
      document.querySelector(`#dailyWeat-${index}>h2`)!.textContent = tempUnit === 'celcius' ? `${parseInt(day.temp.day, 10)}°C` : `${parseInt(celToFarConverter(day.temp.day), 10)}°F`;
      document.querySelector(`#dailyWeat-${index}>i`)!.classList.add(`owf-${day.weather[0].id}`);
    }
  });
};

export default async (search: string) => {
  const unit = localStorage.getItem('unit') ? localStorage.getItem('unit') : 'celcius';
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  const { city, town, village, country } = await getCity();
  const { current, daily, timezone_offset } = await getWeatherData(lang);
  renderTimeandLocation(city, town, village, country, lang, timezone_offset);
  renderCurrentData(current, unit, lang);
  renderFutureForecast(daily, unit, lang);
};

export { renderCurrentData, renderFutureForecast, renderTimeandLocation }
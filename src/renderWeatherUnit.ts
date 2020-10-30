// render units with current and future daily forecast
import moment from 'moment';
import { lang, unit } from './models/lang-unit';
import {textEnglish, textPolish} from './utils/lang-text';
import { getLangFromLS, getUnitFromLS } from './utils/data-from-ls';
import {Current, Daily} from './models/weatherDataCall';
import { getCity } from './position';
import getWeatherData from './getWeatherData';

export const renderTempText = (celcius: number, unit: unit) => {
  if (unit === 'celcius') {
    return `${Math.round(celcius)}°C`
  } else {
    const farenheit = celcius * 1.8 + 32
    return `${Math.round(farenheit)}°F`
  }
}

const renderTimeandLocation = ( country: string, lang: lang, timezone: number, city?: string, town?: string, village?: string) => {
  const now = moment();
  document.querySelector('#location')!.textContent = `${city || town || village}, ${country}`;
  document.querySelector('#time')!.textContent = now.utcOffset(timezone / 60).locale(lang).format('ddd DD MMMM HH:mm');
};

const renderCurrentData = (current: Current, tempUnit: unit, lang: lang) => {
  const now = moment();
  const text = lang === 'en' ? textEnglish : textPolish;
  document.querySelector('#currentTemp')!.textContent = renderTempText(current.temp, tempUnit);
  const iconSuffix = now.unix() > current.sunrise && now.unix() < current.sunset ? 'd' : 'n';
  document.querySelector('.temp-widget>i')!.classList.add(`owf-${current.weather[0].id}-${iconSuffix}`);

  document.querySelector('#summary')!.textContent = current.weather[0].description;
  document.querySelector('#feelsLike')!.textContent = renderTempText(current.temp, tempUnit);
  document.querySelector('#wind')!.textContent = `${text.weather.wind}: ${current.wind_speed} (m/s)`;
  document.querySelector('#humidity')!.textContent = `${text.weather.humidity}: ${current.humidity}%`;
};

const renderFutureForecast = (data: Daily[], tempUnit: unit, lang: lang) => {
  data.map((day: Daily, index: number) => {
    if (index > 0 && index < 4) {
      document.querySelector(`#dailyWeat-${index}>h3`)!.textContent = moment.unix(day.dt).locale(lang).format('dddd');
      document.querySelector(`#dailyWeat-${index}>h2`)!.textContent = renderTempText(day.temp.day, tempUnit);
      document.querySelector(`#dailyWeat-${index}>i`)!.classList.add(`owf-${day.weather[0].id}`);
    }
  });
};

export default async () => {
  const unit = getUnitFromLS();
  const lang = getLangFromLS();
  const { city, town, village, country } = await getCity();
  const { current, daily, timezone_offset } = await getWeatherData(lang);
  renderTimeandLocation(country, lang, timezone_offset, city, town, village);
  renderCurrentData(current, unit, lang);
  renderFutureForecast(daily, unit, lang);
};

export { renderCurrentData, renderFutureForecast, renderTimeandLocation }
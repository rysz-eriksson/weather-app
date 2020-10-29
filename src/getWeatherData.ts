import {lang} from './models/lang-unit'
import Coords from './models/coords';
import {WeatherDataCall} from './models/weatherDataCall';
import apiKeys from './apiKeys';

const getWeatherData = async (lang?: lang) => {
  if (!lang) {
    lang = 'en'
  }
  const position: Coords = JSON.parse(localStorage.getItem('coords')!);
  const oneCallUrl: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.latitude}&lon=${position.longitude}&units=metric&lang=${lang}&
  exclude=minutely,hourly&appid=${apiKeys.owmKey}`;
  const weatherData: WeatherDataCall = await fetch(oneCallUrl)
    .then((res) => res.json())
    .then((data) => data).catch((err) => {
      console.log(err);
    });
  return weatherData;
};

export { getWeatherData as default };

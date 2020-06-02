import { getCoords } from './position';
import apiKeys from './apiKeys';

const getWeatherData = async () => {
  const { latitude, longitude } = await getCoords();
  const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&
  exclude=minutely,hourly&appid=${apiKeys.owmKey}`;
  const weatherData = await fetch(oneCallUrl)
    .then((res) => res.json())
    .then((data) => data).catch((err) => {
      console.log(err);
    });
  return weatherData;
};

export { getWeatherData as default };

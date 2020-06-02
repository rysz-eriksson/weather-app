import getPosition from './position';
import apiKeys from './apiKeys';

const getWeatherData = async (url) => {
  const weatherData = await fetch(url)
    .then((res) => res.json())
    .then((data) => data).catch((err) => {
      console.log(err);
    });
  return weatherData;
};

const getCurrentWeather = async () => {
  const { city } = await getPosition();
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeys.owmKey}`;
  return getWeatherData(currentWeatherUrl);
};

const getFutureForecast = async () => {
  const { city } = await getPosition();
  const futuretWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=3&appid=${apiKeys.owmKey}`;
  return getWeatherData(futuretWeatherUrl);
};

export { getCurrentWeather, getFutureForecast };

// https://openweathermap.org/api/one-call-api

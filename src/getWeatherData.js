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

// const getCurrentWeather = async () => {
//   // const { city } = await getPosition();
//   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Krakow&units=metric&appid=${apiKeys.owmKey}`;
//   const weatherData = await fetch(currentWeatherUrl)
//   .then((res) => res.json())
//   .then((data) => data).catch((err) => {
//     console.log(err);
//   });
// return weatherData;
// };

// const getFutureForecast = async () => {
  //   const { city } = await getPosition();
//   const futuretWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=3&appid=${apiKeys.owmKey}`;
//   return getWeatherData(futuretWeatherUrl);
// };

// export { getCurrentWeather, getFutureForecast };

// https://openweathermap.org/api/one-call-api

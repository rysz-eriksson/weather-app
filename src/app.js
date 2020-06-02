import renderCurrentWeather from './renderCurrentWeather';
import { getFutureForecast } from './getWeatherData';
import './styles/main.css';

renderCurrentWeather();

const renderFutureWeather = async () => {
  const weatherData = await getFutureForecast();
  console.log(weatherData);
};

renderFutureWeather();

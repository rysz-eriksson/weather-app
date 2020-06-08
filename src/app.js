import moment from 'moment';
import './DOMstrcuture';
import apiKeys from './apiKeys';
import { renderControlUnit } from './renderControlUnit';
import renderCurrentWeather from './renderWeatherUnit';
import { renderPos } from './renderLocationUnit';
import renderImage from './renderPicture';
import getWeatherData from './getWeatherData';
import { getCoords, getCity } from './position';
import './styles/main.css';

// const language = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
// const unit = JSON.parse(localStorage.getItem('unit')) ? JSON.parse(localStorage.getItem('unit')) : 'celcius';

// console.log(language, unit)

renderControlUnit();
renderCurrentWeather();
renderPos();
renderImage();
setInterval(renderCurrentWeather, 60000);

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

renderControlUnit();
renderCurrentWeather();
renderPos();
renderImage();
setInterval(renderCurrentWeather, 60000);

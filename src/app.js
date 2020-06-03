import './DOMstrcuture';
import apiKeys from './apiKeys';
import { renderControlUnit } from './controlUnit';
import renderCurrentWeather from './renderWeatherUnit';
import { renderPos } from './renderLocationUnit';
import getWeatherData from './getWeatherData';
import { getCoords, getCity } from './position';
import './styles/main.css';

renderControlUnit()
renderCurrentWeather();
renderPos();

import moment from 'moment';
import './DOMstrcuture';
import apiKeys from './apiKeys';
import { renderControlUnit, renderSearchPanel, renderVoiceSearch } from './renderControlUnit';
import renderCurrentWeather from './renderWeatherUnit';
import { renderPos } from './renderLocationUnit';
import renderImage from './renderPicture';
import getWeatherData from './getWeatherData';
import { getCoords, getCity } from './position';
import './styles/main.css';

const renderApp = async () => {

  await getCoords();
  renderControlUnit();
  renderSearchPanel();
  renderVoiceSearch();
  renderCurrentWeather();
  renderPos();
  renderImage();
};
renderApp();

setInterval(renderCurrentWeather, 60000);

import { renderControlUnit, renderSearchPanel, renderVoiceSearch } from './renderControlUnit';
import renderCurrentWeather from './renderWeatherUnit';
import { renderPos } from './renderLocationUnit';
import renderImage from './renderPicture';
import { getCoords } from './position';
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

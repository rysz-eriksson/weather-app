// render location unit (map + coordinates)

import {getCoordsFromLS, getLangFromLS} from './utils/data-from-ls'
import apiKeys from './apiKeys';
import { Map } from 'mapbox-gl'
import { textEnglish, textPolish } from './utils/lang-text';

const dmsConvert = (anglePos: number) => {
  const degrees = Math.floor(anglePos);
  const minutes = Math.round((anglePos - degrees) * 60);
  return `${degrees}° ${minutes}'`;
};

const renderCoordsText = () => {
  const position = getCoordsFromLS();
  const lang = getLangFromLS();
  const text = lang === 'en' ? textEnglish : textPolish;
  document.querySelector('#latitude')!.textContent = `${text.location.latText}: ${dmsConvert(position.latitude)}`;
  document.querySelector('#longitude')!.textContent = `${text.location.longText}: ${dmsConvert(position.longitude)}`;

}

const renderPos = () => {
  const position = getCoordsFromLS();
  renderCoordsText();

  const map = new Map({
    accessToken: apiKeys.mapBoxKey,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [position.longitude, position.latitude],
    zoom: 10,
  });
};


export { renderPos, renderCoordsText };
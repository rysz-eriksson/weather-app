// render location unit (map + coordinates)

import Coords from './models/coords'
import apiKeys from './apiKeys';
import { Map } from 'mapbox-gl'

const dmsConvert = (anglePos: number) => {
  const degrees = Math.floor(anglePos);
  const minutes = Math.round((anglePos - degrees) * 60);
  return `${degrees}° ${minutes}'`;
};

const renderCoordsText = () => {
  const position: Coords = JSON.parse(localStorage.getItem('coords')!);
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  document.querySelector('#latitude')!.textContent = `${lang === 'en' ? 'Latitude' : 'Szerokość'}: ${dmsConvert(position.latitude)}`;
  document.querySelector('#longitude')!.textContent = `${lang === 'en' ? 'Longitude' : 'Długość'}: ${dmsConvert(position.longitude)}`;

}

const renderPos = () => {
  const position: Coords = JSON.parse(localStorage.getItem('coords')!);
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
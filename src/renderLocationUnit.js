/* eslint-disable no-undef */
import apiKeys from './apiKeys';
import { getCoords } from './position';

const dmsConvert = (anglePos) => {
  const degrees = Math.floor(anglePos);
  const minutes = parseInt((anglePos - degrees) * 60, 10);
  return `${degrees}° ${minutes}'`;
};

const renderPos = async (city) => {
  const coords = [];
  const { latitude, longitude } = await getCoords(city);
  coords.push(longitude);
  coords.push(latitude);
  document.querySelector('#latitude').textContent = `Latitude: ${dmsConvert(latitude)}`;
  document.querySelector('#longitude').textContent = `Latitude: ${dmsConvert(longitude)}`;

  const map = new mapboxgl.Map({
    accessToken: apiKeys.mapBoxKey,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [...coords],
    zoom: 10,
  });
};


export { renderPos };
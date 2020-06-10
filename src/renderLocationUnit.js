// render location unit (map + coordinates)

import apiKeys from './apiKeys';

const dmsConvert = (anglePos) => {
  const degrees = Math.floor(anglePos);
  const minutes = parseInt((anglePos - degrees) * 60, 10);
  return `${degrees}° ${minutes}'`;
};

const renderCoordsText = () => {
  const { latitude, longitude } = JSON.parse(localStorage.getItem('coords'));
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  document.querySelector('#latitude').textContent = `${lang === 'en' ? 'Latitude' : 'Szerokość'}: ${dmsConvert(latitude)}`;
  document.querySelector('#longitude').textContent = `${lang === 'en' ? 'Longitude' : 'Długość'}: ${dmsConvert(longitude)}`;

}

const renderPos = () => {
  const coords = [];
  const { latitude, longitude } = JSON.parse(localStorage.getItem('coords'));
  coords.push(longitude);
  coords.push(latitude);
  renderCoordsText();

  const map = new mapboxgl.Map({
    accessToken: apiKeys.mapBoxKey,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [...coords],
    zoom: 10,
  });
};


export { renderPos, renderCoordsText };
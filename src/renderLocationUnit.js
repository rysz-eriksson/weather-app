import apiKeys from './apiKeys';
import { getCoords } from './position';

const renderPos = async () => {
  const coords = [];
  const { latitude, longitude } = await getCoords();
  coords.push(longitude)
  coords.push(latitude)

  const mapContainer = document.createElement('div');
  mapContainer.setAttribute('id', 'map');
  document.querySelector('body').appendChild(mapContainer);
  const latEl = document.createElement('p')
  latEl.textContent = `Latitude`


  const map = new mapboxgl.Map({
    accessToken: apiKeys.mapBoxKey,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [...coords],
    zoom: 10,
  });

console.log(coords)
};


export { renderPos };
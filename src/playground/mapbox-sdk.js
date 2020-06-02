const mapContainer = document.createElement('div');
mapContainer.setAttribute('id', 'map');
document.querySelector('body').appendChild(mapContainer);

	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1Ijoicnlzei1lcmlrc3NvbiIsImEiOiJja2F4dnl2dHkwYThpMnFuaWp1M3Y3bjRyIn0.kgHn7Wv61ElAWvOhMicRYA';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});
 
import apiKeys from './apiKeys';

const getSearchedCity = async (query) => {
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&language=${lang}&key=${apiKeys.ocdKey}`
  const value = await fetch(url)
    .then((res) => res.json())
    .then((data) => ({
      city: data.results[0].formatted.split(',')[0],
      country: data.results[0].components.country,
      latitude: data.results[0].geometry.lat,
      longitude: data.results[0].geometry.lng,
    }))
    .catch((err) => {
      console.log('Error', err);
    });
  return value;
};

const getCoords = async (search) => {
  let position = {};
  if (search) {
    position = await getSearchedCity(search);
  } else {
    position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve(pos.coords);
      },
      (error) => {
        reject(error);
      });
    }).then((data) => ({
      latitude: data.latitude,
      longitude: data.longitude,
    })).catch((err) => {
      console.log(err);
    });
  }
  localStorage.setItem('coords', JSON.stringify(position));
  // return position;
};

const getCity = async () => {
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  const { latitude, longitude } = JSON.parse(localStorage.getItem('coords'));
  const cityUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude.toFixed(7)},${longitude.toFixed(7)}&language=${lang}&key=${apiKeys.ocdKey}`;
  const locDetails = await fetch(cityUrl)
    .then((res) => res.json())
    .then((data) => {
      return data.results[0].components;
    })
    .catch((err) => {
      console.log(err);
    });
  return locDetails;
};




export { getCoords, getCity, getSearchedCity };

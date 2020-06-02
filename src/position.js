import apiKeys from './apiKeys';

const getCoords = async () => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve(pos.coords);
    },
    (error) => {
      reject(error);
    });
  }).catch((err) => {
    console.log(err);
  });
  return position;
};

const getCity = async () => {
  const { latitude, longitude } = await getCoords();
  const cityUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude.toFixed(7)},${longitude.toFixed(7)}&key=${apiKeys.ocdKey}`;
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

export { getCoords, getCity };

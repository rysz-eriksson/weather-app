import ReturnedCity from './models/returnedCity'
import Coords from './models/coords';
import {getLangFromLS, getCoordsFromLS} from './utils/data-from-ls'
import apiKeys from './apiKeys';

type locationDetails = {
  city?: string,
  town?: string,
  village?: string
  continent: string,
  country: string,
  country_code: string,
  formatted: string,
  geometry: {
    lat: number,
    lng: number
  }
}


// return city data for the city from search
const getSearchedCity = async (query:string) => {
  const lang = getLangFromLS();
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&language=${lang}&key=${apiKeys.ocdKey}`;

    const value = await fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      console.log('Error', err);
    });
    const city: ReturnedCity = {
      city: value.results[0].formatted.split(',')[0],
      country: value.results[0].components.country,
      latitude: value.results[0].geometry.lat,
      longitude: value.results[0].geometry.lng
    }
  return city;
};

// get coords from navigator web API or from getSearchedCity func and put to local storage
const getCoords = async (search?: string) => {
  let position: Coords;
  if (search) {
   const { latitude, longitude } = await getSearchedCity(search);
   position = { latitude, longitude}
  } else {
    const result = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve(pos.coords);
      },
      (error) => {
        reject(error);
      });
    }).then((data: any) => data)
    .catch((err) => {
      console.log(err);
    });
    position = {
      latitude: result.latitude,
      longitude: result.longitude
    }
  }
  localStorage.setItem('coords', JSON.stringify(position));
};

// get the city, country info
const getCity = async () => {
  const lang = getLangFromLS();
  const position = getCoordsFromLS();
  const cityUrl: string = `https://api.opencagedata.com/geocode/v1/json?q=${position.latitude.toFixed(7)},${position.longitude.toFixed(7)}&language=${lang}&key=${apiKeys.ocdKey}`;
  const locDetails: locationDetails = await fetch(cityUrl)
    .then((res) => res.json())
    .then((data) => data.results[0].components)
    .catch((err) => {
      console.log(err);
    });
  return locDetails;
};

export { getCoords, getCity, getSearchedCity };

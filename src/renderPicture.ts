// calls to unsplash API to render images based on time of day, season and current weather

import moment from 'moment';
import apiKeys from './apiKeys';
import getWeatherData from './getWeatherData';

const getSeason = (month: number) => {
  if (month > 1 && month < 5) {
    return 'spring';
  } if (month > 4 && month < 8) {
    return 'summer';
  } if (month > 7 && month < 11) {
    return 'autumn';
  }
  return 'winter';
};

export default async () => {
  const { current } = await getWeatherData();
  const isNight = !(moment().unix() > current.sunrise && moment().unix() < current.sunset);
  const season = getSeason(moment().month());
  const query = isNight ? `night,${current.weather[0].main}` : `${season},${current.weather[0].main}`;
  const queryUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${apiKeys.unsplashKey}`;
  const photoUrl: string = await fetch(queryUrl)
    .then((res) => res.json())
    .then((data) => data.urls.regular).catch((err) => {
      console.log(err);
    });
  const htmlEl = document.querySelector('.page-container')! as HTMLElement;
  htmlEl.setAttribute('style', `background-image: url(${photoUrl});`);
};

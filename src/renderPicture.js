import moment from 'moment';
import apiKeys from './apiKeys';
import getWeatherData from './getWeatherData';

const getSeason = (month) => {
  if (month > 1 && month < 5) {
    return 'spring';
  } if (month > 4 && month < 8) {
    return 'summer';
  } if (month > 7 && month < 11) {
    return 'autumn';
  }
  return 'winter';
};

export default async (city) => {
  const { current } = await getWeatherData(city);
  const isNight = !(moment().unix() > current.sunrise && moment().unix() < current.sunset);
  const season = getSeason(moment().month());
  const query = isNight ? `night,${current.weather[0].main}` : `${season},${current.weather[0].main}`;
  const queryUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${apiKeys.unsplashKey}`;
  const photoUrl = await fetch(queryUrl)
    .then((res) => res.json())
    .then((data) => {
      return data.urls.regular;
    }).catch((err) => {
      console.log(err);
    });
  console.log(queryUrl);
  const htmlEl = document.querySelector('html');
  htmlEl.setAttribute('style', `background: url(${photoUrl}) no-repeat center center fixed;`);
};



// query conditions: if after sunset = night + weather summary; if before sunset = 

// auto=format:  for automatically choosing the optimal image format depending on user browser

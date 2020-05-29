import getPosition from './navigator';
import apiKeys from './apiKeys';
import './styles/main.css';

const header = document.createElement('h1');
header.textContent = 'blablabla';
document.querySelector('body').appendChild(header);
console.log(getPosition(2, 6));

const city = 'krakow';



const getWeatherCurrentData = async () => {
//   const success = (pos) => {
//     return pos.coords;
//   };
//   const currentLoc = await navigator.geolocation.getCurrentPosition(success);

  const geolocation = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) =>{ 
      resolve(position.coords); 
    },
    (error) => { reject(error); }
    )}).catch((error) => error);
  const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys.owmKey}`;
  const urlCoords = `https://api.openweathermap.org/data/2.5/find?lat=${geolocation.latitude}&lon=${geolocation.longitude}&cnt=10&appid=${apiKeys.owmKey}`;
  fetch(urlCoords)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
}

getWeatherCurrentData();


// creating DOM structure

// header containing control unit

const pageContainer = document.createElement('div');
pageContainer.classList.add('page-container');
document.querySelector('body').appendChild(pageContainer);
const overlay = document.createElement('div');
overlay.classList.add('overlay');
pageContainer.appendChild(overlay);

const header = document.createElement('header');
overlay.appendChild(header);
const controlButtons = document.createElement('div');
controlButtons.setAttribute('id', 'controlPanel');
header.appendChild(controlButtons);
const search = document.createElement('div');
search.setAttribute('id', 'searchPanel');
header.appendChild(search);

// section for current weather display
const weatherDisplay = document.createElement('main');
overlay.appendChild(weatherDisplay);
const currentWeather = document.createElement('section');
currentWeather.setAttribute('id', 'curWeat');
weatherDisplay.appendChild(currentWeather);
const timeAndLoc = document.createElement('div');
timeAndLoc.classList.add('time-n-loc');
currentWeather.appendChild(timeAndLoc);
const locationEl = document.createElement('h1');
locationEl.setAttribute('id', 'location');
const timeEl = document.createElement('p');
timeEl.setAttribute('id', 'time');
timeAndLoc.appendChild(locationEl);
timeAndLoc.appendChild(timeEl);
const tempWidget = document.createElement('div');
tempWidget.classList.add('temp-widget');
currentWeather.appendChild(tempWidget);
const temp = document.createElement('h1');
temp.setAttribute('id', 'currentTemp');
tempWidget.appendChild(temp);
const icon = document.createElement('i');
icon.classList.add('owf');
icon.classList.add('owf');
tempWidget.appendChild(icon);
const summaryWidget = document.createElement('div');
summaryWidget.classList.add('sum-widget');
currentWeather.appendChild(summaryWidget);
const summary = document.createElement('h3');
summary.setAttribute('id', 'summary');
summaryWidget.appendChild(summary);
const summaryPars = ['feelsLike', 'wind', 'humidity'];
summaryPars.forEach((item) => {
  const par = document.createElement('p');
  par.setAttribute('id', item);
  summaryWidget.appendChild(par);
});

// section for future daily weather display
const dailyWeather = document.createElement('section');
currentWeather.setAttribute('id', 'dailyWeat');
weatherDisplay.appendChild(dailyWeather);

for (let i = 1; i < 4; i++) {
  const dayContainer = document.createElement('div');
  dayContainer.setAttribute('id', `dailyWeat-${i}`);
  dailyWeather.appendChild(dayContainer);
  const weekday = document.createElement('h3');
  dayContainer.appendChild(weekday);
  const subContainer = document.createElement('div');
  dayContainer.appendChild(subContainer);
  const dailyTemp = document.createElement('h2');
  subContainer.appendChild(dailyTemp);
  const dailyIcon = document.createElement('i');
  dailyIcon.classList.add('owf');
  subContainer.appendChild(dailyIcon);
}

// section for geolocation display
const locationDataContainer = document.createElement('aside');
locationDataContainer.setAttribute('id', 'locationData');
overlay.appendChild(locationDataContainer);
const mapContainer = document.createElement('div');
mapContainer.setAttribute('id', 'map');
locationDataContainer.appendChild(mapContainer);
const latEl = document.createElement('p');
latEl.setAttribute('id', 'latitude');
const longEl = document.createElement('p');
longEl.setAttribute('id', 'longitude');
locationDataContainer.appendChild(latEl);
locationDataContainer.appendChild(longEl);

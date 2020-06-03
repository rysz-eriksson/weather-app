/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
// refresh button
// language button
// temp button
// search input

import renderCurrentWeather from './renderWeatherUnit';
import renderImage from './renderPicture';

let language = 'en';
let tempUnit = 'celcius';

class Reload {
  constructor() {
    this.id = 'reload'
    this.content = 'RELOAD';
  }

  onClickAction() {
    renderImage();
  }
}

class Language {
  constructor(id) {
    this.id = id;
    this.content = this.id.toUpperCase()
  }

  onClickAction() {
    if (language !== this.id) {
      language = this.id;
    }
  }
}

class Temperature {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  onClickAction() {
    if (tempUnit !== this.id) {
      tempUnit = this.id;
      renderCurrentWeather();
    }
  }
}

const buttonsArray = [new Reload(), new Language('en'), new Language('pl'), new Temperature('celcius', '°C'), new Temperature('farenheit', '°F')]

const renderControlUnit = () => {
  buttonsArray.map((item) => {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', item.id);
    buttonEl.textContent = item.content;
    buttonEl.addEventListener('click', item.onClickAction);
    document.querySelector('header').appendChild(buttonEl);
  });
};

export { renderControlUnit, tempUnit }
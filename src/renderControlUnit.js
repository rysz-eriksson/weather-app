/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */

import { getSearchedCity } from './position';
import renderCurrentWeather from './renderWeatherUnit';
import renderImage from './renderPicture';


// variables to store lang and temp unit choice 
let language = 'en';
let tempUnit = 'celcius';

// classes for buttons

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
    document.querySelector('#controlPanel').appendChild(buttonEl);
  });
};

// defining elements for search panel

const searchInput = document.createElement('input')
searchInput.setAttribute('id', 'searchInput')
searchInput.setAttribute('placeholder', 'search City')
document.querySelector('#searchPanel').appendChild(searchInput)

const searchSubmit = document.createElement('button')
searchSubmit.textContent = 'search'
searchSubmit.addEventListener('click', () => {
  const text = document.querySelector('#searchInput').value
  getSearchedCity(text)
})
document.querySelector('#searchPanel').appendChild(searchSubmit)

export { renderControlUnit, tempUnit }
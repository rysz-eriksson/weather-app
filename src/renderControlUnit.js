/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */

import renderCurrentWeather from './renderWeatherUnit';
import { renderPos, renderCoordsText } from './renderLocationUnit';
import renderImage from './renderPicture';

// classes for buttons

class Reload {
  constructor() {
    this.id = 'reload';
    this.content = 'RELOAD';
  }

  onClickAction() {
    renderImage();
  }
}

class Language {
  constructor(id) {
    this.id = id;
    this.content = this.id.toUpperCase();
  }

  onClickAction() {
    localStorage.setItem('lang', this.id);
    renderCurrentWeather();
    renderCoordsText();
  }
}

class Temperature {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  onClickAction() {
    localStorage.setItem('unit', this.id);
    renderCurrentWeather();
  }
}

const buttonsArray = [new Reload(), new Language('en'), new Language('pl'), new Temperature('celcius', '°C'), new Temperature('farenheit', '°F')];

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

// search input

const searchInput = document.createElement('input');
searchInput.setAttribute('id', 'searchInput');
searchInput.setAttribute('placeholder', 'search City');
document.querySelector('#searchPanel').appendChild(searchInput);

const searchSubmit = document.createElement('button');
searchSubmit.textContent = 'search';
searchSubmit.addEventListener('click', () => {
  const text = document.querySelector('#searchInput').value;
  renderCurrentWeather(text);
  renderImage(text);
  renderPos(text);
});
document.querySelector('#searchPanel').appendChild(searchSubmit);

// voice search

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.addEventListener('result', (e) => {
  console.log(e);
  const { transcript } = e.results[0][0];
  document.querySelector('#searchInput').value = transcript;
  renderCurrentWeather(transcript);
  renderImage(transcript);
  renderPos(transcript);
});

const voiceSearch = document.createElement('button');
voiceSearch.textContent = 'Voice';
voiceSearch.addEventListener('click', () => {
  recognition.lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  recognition.start();
});
document.querySelector('#searchPanel').appendChild(voiceSearch);

export { renderControlUnit };
import renderCurrentWeather from './renderWeatherUnit';
import { renderPos, renderCoordsText } from './renderLocationUnit';
import renderImage from './renderPicture';
import { getCoords } from './position';

// classes for buttons

class Reload {
  constructor() {
    this.id = 'reload';
    this.content = '';
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
    searchPanelLangChange();
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


// rendering buttons for control panel
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

const reloadAfterChange = async (cityName) => {
  await getCoords(cityName);
  renderCurrentWeather();
  renderImage();
  renderPos();
};

const renderSearchPanel = () => {
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  const searchInput = document.createElement('input');
  searchInput.setAttribute('id', 'searchInput');
  searchInput.setAttribute('placeholder', `${lang === 'en' ? 'Search city' : 'Szukaj miasta'}`);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const text = document.querySelector('#searchInput').value;
      reloadAfterChange(text);
    }
  });
  document.querySelector('#searchPanel').appendChild(searchInput);

  const searchSubmit = document.createElement('button');
  searchSubmit.setAttribute('id', 'searchButton');
  searchSubmit.textContent = `${lang === 'en' ? 'Search' : 'Szukaj'}`;
  searchSubmit.addEventListener('click', () => {
    const text = document.querySelector('#searchInput').value;
    reloadAfterChange(text);
  });
  document.querySelector('#searchPanel').appendChild(searchSubmit);
};

const searchPanelLangChange = () => {
  const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  document.querySelector('#searchInput').setAttribute('placeholder', `${lang === 'en' ? 'Search city' : 'Szukaj miasta'}`);
  document.querySelector('#searchButton').textContent = `${lang === 'en' ? 'Search' : 'Szukaj'}`;
};

// voice search

const renderVoiceSearch = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.addEventListener('result', (e) => {
    const { transcript } = e.results[0][0];
    document.querySelector('#searchInput').value = transcript;
    reloadAfterChange(transcript);
  });
  const voiceSearch = document.createElement('button');
  voiceSearch.classList.add('voice');
  voiceSearch.addEventListener('click', () => {
    recognition.lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
    recognition.start();
  });
  document.querySelector('#searchPanel').appendChild(voiceSearch);
};


export { renderControlUnit, renderSearchPanel, renderVoiceSearch };

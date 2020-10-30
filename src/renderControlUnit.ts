import {getLangFromLS} from './utils/data-from-ls';
import renderCurrentWeather from './renderWeatherUnit';
import { renderPos, renderCoordsText } from './renderLocationUnit';
import renderImage from './renderPicture';
import { getCoords } from './position';
import { textEnglish, textPolish } from './utils/lang-text';

// classes for buttons

abstract class Button {
  protected id: string;
  protected abstract content: string;
  constructor(id: string) {
    this.id = id;
  }

  getContent() {
    return this.content;
  }
  getId() {
    return this.id;
  }
  abstract onClickAction(): void;
}

class Reload extends Button{
  content: string;
  constructor(public id: string) {
    super(id)
    this.content = ''
  }
  onClickAction() {
    renderImage();
  }
}

class Language extends Button {
  content: string
  constructor(id: string) {
    super(id)
    this.content = this.id.toUpperCase()
  }

  onClickAction() {
    localStorage.setItem('lang', this.id);
    searchPanelLangChange();
    renderCurrentWeather();
    renderCoordsText();
  }
}

class Temperature extends Button {
  content: string
  constructor(id: string, content: string) {
    super(id)
    this.content = content;
  }

  onClickAction() {
    localStorage.setItem('unit', this.id);
    renderCurrentWeather();
  }
}

const buttonsArray = [new Reload('reload'), new Language('en'), new Language('pl'), new Temperature('celcius', '°C'), new Temperature('farenheit', '°F')];


// rendering buttons for control panel
const renderControlUnit = () => {
  buttonsArray.map((item) => {
    const buttonEl: HTMLButtonElement = document.createElement('button');
    buttonEl.setAttribute('id', item.getId());
    buttonEl.textContent = item.getContent()
    buttonEl.addEventListener('click', item.onClickAction);
    (document.querySelector('#controlPanel')! as HTMLElement).appendChild(buttonEl);
  });
};

// defining elements for search panel

// search input

const reloadAfterChange = async (cityName: string) => {
  await getCoords(cityName);
  renderCurrentWeather();
  renderImage();
  renderPos();
};

const renderSearchPanel = () => {
  const lang = getLangFromLS();
  const text = lang === 'en' ? textEnglish : textPolish;
  const searchInput: HTMLInputElement = document.createElement('input');
  searchInput.setAttribute('id', 'searchInput');
  searchInput.setAttribute('placeholder', text.ctrl.searchPlac);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const text = (document.querySelector('#searchInput')! as HTMLInputElement).value;
      reloadAfterChange(text);
    }
  });
  document.querySelector('#searchPanel')!.appendChild(searchInput);

  const searchSubmit = document.createElement('button');
  searchSubmit.setAttribute('id', 'searchButton');
  searchSubmit.textContent = text.ctrl.searchButton;
  searchSubmit.addEventListener('click', () => {
    const text = (document.querySelector('#searchInput')! as HTMLInputElement).value;
    reloadAfterChange(text);
  });
  document.querySelector('#searchPanel')!.appendChild(searchSubmit);
};

const searchPanelLangChange = () => {
  const lang = getLangFromLS();
  const text = lang === 'en' ? textEnglish : textPolish;
  document.querySelector('#searchInput')!.setAttribute('placeholder', text.ctrl.searchPlac);
  document.querySelector('#searchButton')!.textContent = text.ctrl.searchButton;
};

// voice search

declare global {
  interface Window { webkitSpeechRecognition: any; }
}

const renderVoiceSearch = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.addEventListener('result', (e) => {
    const { transcript } = e.results[0][0];
    (document.querySelector('#searchInput')! as HTMLInputElement).value = transcript;
    reloadAfterChange(transcript);
  });
  const voiceSearch = document.createElement('button');
  voiceSearch.classList.add('voice');
  voiceSearch.addEventListener('click', () => {
    recognition.lang = getLangFromLS();
    recognition.start();
  });
  document.querySelector('#searchPanel')!.appendChild(voiceSearch);
};


export { renderControlUnit, renderSearchPanel, renderVoiceSearch };

'use strict';

const map = document.querySelector(`.map`);
const mapMainPin = document.querySelector(`.map__pin--main`);

const clearMainEvents = () => {
  mapMainPin.removeEventListener(`mousedown`, onMainActiveClick);
  mapMainPin.removeEventListener(`keydown`, onMainEnterPress);
};

const setupActivePage = () => {
  activatePage();
  window.form.setInputAddress();
  clearMainEvents();
};

const onMainActiveClick = (evt) => {
  if (evt.button === window.constants.LEFT_MOUSE_BUTTON) {
    setupActivePage();
  }
};

const onMainEnterPress = (evt) => {
  if (evt.key === window.constants.ENTER_KEYBOARD) {
    setupActivePage();
  }
};

const deactivatePage = () => {
  window.form.isActivePage = false;

  map.classList.add(`map--faded`);

  mapMainPin.addEventListener(`mousedown`, onMainActiveClick);
  mapMainPin.addEventListener(`keydown`, onMainEnterPress);

  window.pin.hideMapPins();
  window.form.disableInputs();
  window.form.disableFilters();
};

const activatePage = () => {
  window.form.isActivePage = true;

  map.classList.remove(`map--faded`);

  window.pin.showMapPins();
  window.form.enableInputs();
};

window.map = {
  deactivatePage
};

'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapMainPin = document.querySelector(`.map__pin--main`);

  const clearMainEvents = function () {
    mapMainPin.removeEventListener(`mousedown`, onMainActiveClick);
    mapMainPin.removeEventListener(`keydown`, onMainEnterPress);
  };

  const setupActivePage = function () {
    activatePage();
    window.form.setInputAddress();
    clearMainEvents();
  };

  const onMainActiveClick = function (evt) {
    if (evt.button === window.constants.LEFT_MOUSE_BUTTON) {
      setupActivePage();
    }
  };

  const onMainEnterPress = function (evt) {
    if (evt.key === window.constants.ENTER_KEYBOARD) {
      setupActivePage();
    }
  };

  const deactivatePage = function () {
    window.form.isActivePage = false;

    map.classList.add(`map--faded`);

    window.pin.hideMapPins();
    window.form.disableInputs();
    window.form.disableFilters();
  };

  const activatePage = function () {
    window.form.isActivePage = true;

    map.classList.remove(`map--faded`);

    window.pin.showMapPins();
    window.form.enableInputs();
  };

  mapMainPin.addEventListener(`mousedown`, onMainActiveClick);
  mapMainPin.addEventListener(`keydown`, onMainEnterPress);

  window.map = {
    deactivatePage
  };
})();

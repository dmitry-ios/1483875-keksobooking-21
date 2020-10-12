'use strict';

(function () {
  const mapMainPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const formHeader = form.querySelector(`.ad-form-header`);
  const formElements = form.querySelectorAll(`.ad-form__element`);
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const mapFilters = mapFiltersForm.querySelectorAll(`.map__filter`);
  const mapFeatures = mapFiltersForm.querySelectorAll(`.map__features`);
  const formAddress = form.querySelector(`input[name=address]`);

  const clearMainEvents = function () {
    mapMainPin.removeEventListener(`mousedown`, onMainActiveClick);
    mapMainPin.removeEventListener(`keydown`, onMainEnterPress);
  };

  const setupActivePage = function () {
    activatePage();
    setInputAddress();
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

  mapMainPin.addEventListener(`mousedown`, onMainActiveClick);
  mapMainPin.addEventListener(`keydown`, onMainEnterPress);

  const disableElement = function (element) {
    element.disabled = true;
  };

  const enableElement = function (element) {
    element.disabled = false;
  };

  const disableInputs = function () {
    form.classList.add(`ad-form--disabled`);
    disableElement(formHeader);
    formElements.forEach(disableElement);
    mapFilters.forEach(disableElement);
    mapFeatures.forEach(disableElement);
  };

  const enableInputs = function () {
    form.classList.remove(`ad-form--disabled`);
    enableElement(formHeader);
    formElements.forEach(enableElement);
    mapFilters.forEach(enableElement);
    mapFeatures.forEach(enableElement);
  };

  const deactivatePage = function () {
    window.map.isActivePage = false;

    window.map.mapNode.classList.add(`map--faded`);

    window.map.hideMapPins();
    disableInputs();
  };

  const activatePage = function () {
    window.map.isActivePage = true;

    window.map.mapNode.classList.remove(`map--faded`);

    window.map.showMapPins();
    enableInputs();
  };

  const setInputAddress = function () {
    let x = mapMainPin.offsetLeft;
    let y = mapMainPin.offsetTop;

    if (window.map.isActivePage) {
      x -= window.constants.PIN_OFFSET_X;
      y -= window.constants.PIN_OFFSET_Y;
    } else {
      x += Math.round(mapMainPin.clientWidth / 2);
      y += Math.round(mapMainPin.clientHeight / 2);
    }

    formAddress.value = `${x}, ${y}`;
  };

  window.form = {
    formNode: form,
    deactivatePage,
    setInputAddress
  };
})();

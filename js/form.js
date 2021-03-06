'use strict';

const mapMainPin = document.querySelector(`.map__pin--main`);
const form = document.querySelector(`.ad-form`);
const formHeader = form.querySelector(`.ad-form-header`);
const formElements = form.querySelectorAll(`.ad-form__element`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFilters = mapFiltersForm.querySelectorAll(`.map__filter`);
const mapFeatures = mapFiltersForm.querySelectorAll(`.map__features`);
const formAddress = form.querySelector(`input[name=address]`);

let isActivePage = true;

const disableElement = (element) => {
  element.disabled = true;
};

const enableElement = (element) => {
  element.disabled = false;
};

const disableFilters = () => {
  mapFilters.forEach(disableElement);
  mapFeatures.forEach(disableElement);
};

const enableFilters = () => {
  mapFilters.forEach(enableElement);
  mapFeatures.forEach(enableElement);
};

const disableInputs = () => {
  form.classList.add(`ad-form--disabled`);
  disableElement(formHeader);
  formElements.forEach(disableElement);
};

const enableInputs = () => {
  form.classList.remove(`ad-form--disabled`);
  enableElement(formHeader);
  formElements.forEach(enableElement);
};

const setInputAddress = () => {
  let x = mapMainPin.offsetLeft;
  let y = mapMainPin.offsetTop;

  if (isActivePage) {
    x -= window.constants.PIN_OFFSET_X;
    y -= window.constants.PIN_OFFSET_Y;
  } else {
    x += Math.round(mapMainPin.clientWidth / 2);
    y += Math.round(mapMainPin.clientHeight / 2);
  }

  formAddress.value = `${x}, ${y}`;
};

window.form = {
  filterForm: mapFiltersForm,
  formNode: form,
  enableFilters,
  disableFilters,
  disableInputs,
  enableInputs,
  setInputAddress,
  isActivePage
};

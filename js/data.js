'use strict';

const ANY_TYPE = `any`;

const valuesType = {
  'flat': `Квартира`,
  'bungalow': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`
};

const minPrice = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000
};

const roomValidityMessage = {
  1: `1 комната — «для 1 гостя»`,
  2: `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
  3: `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
  100: `100 комнат — «не для гостей»`
};

let offers = [];

window.data = {
  ANY_TYPE,
  valuesType,
  minPrice,
  roomValidityMessage,
  offers
};

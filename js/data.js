'use strict';

const TITLES = [
  `Милая, уютная квартира в центре Токио`,
  `Футуристическое жилье в современном районе`,
  `Дворец с роботами`,
  `Личный дом с котиками и собачками`,
  `Бунгало со всеми удобствами`,
  `Маленькая комнатка со скоростным интернетом`,
  `Большая квартира для большой компании`,
  `Романтическое гнездышко в городе будущего`
];

const TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

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

const TIMES = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const roomValidityMessage = {
  1: `1 комната — «для 1 гостя»`,
  2: `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
  3: `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
  100: `100 комнат — «не для гостей»`
};

let offers = [];

window.data = {
  TITLES,
  TYPES,
  ANY_TYPE,
  valuesType,
  minPrice,
  TIMES,
  FEATURES,
  PHOTOS,
  roomValidityMessage,
  offers
};

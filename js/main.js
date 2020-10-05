'use strict';

const SIZE_OF_MOCK = 8;
const MAX_LOCATION_Y = 630;
const MIN_LOCATION_Y = 130;
const MAX_PRICE = 10500;
const MIN_PRICE = 1000;
const PIN_OFFSET_X = -25;
const PIN_OFFSET_Y = -70;
const SHORT_TITLE_MESSAGE = `Минимальная длина — 30 символов`;
const LONG_TITLE_MESSAGE = `Максимальная длина — 100 символов`;
const MISSING_TITLE_MESSAGE = `Обязательное текстовое поле`;
const LEFT_MOUSE_BUTTON = 0;
const ENTER_KEYBOARD = `Enter`;

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

const valuesType = {
  'flat': `Квартира`,
  'bungalow': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`
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

let isActivePage = true;

const randomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
};

const makeElements = function (limit, producer) {
  let elements = [];

  for (let i = 0; i < limit; i++) {
    elements[i] = producer(i);
  }

  return elements;
};

const generateAvatarUrl = function (index) {
  index += 1;
  let suffix = (index < 10) ? `0${index}` : index;
  return `img/avatars/user${suffix}.png`;
};

const avatars = makeElements(SIZE_OF_MOCK, generateAvatarUrl);
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const mapWidth = mapPins.clientWidth;
const pinTemplate = document.querySelector(`#pin`);
const pinItem = pinTemplate.content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`);
const mapCard = cardTemplate.content.querySelector(`.map__card`);
const filtersContainer = document.querySelector(`.map__filters-container`);

const makeOffer = function (index) {
  shuffleArray(PHOTOS);
  shuffleArray(FEATURES);
  const maxFeatues = randomRange(1, FEATURES.length);
  const features = FEATURES.slice(0, maxFeatues);
  const maxPhotos = randomRange(1, PHOTOS.length);
  const photos = PHOTOS.slice(0, maxPhotos);
  const locationX = randomRange(0, getMapMaxWidth());
  const locationY = randomRange(MIN_LOCATION_Y, MAX_LOCATION_Y);
  return {
    "author": {
      "avatar": avatars[index]
    },
    "offer": {
      "title": TITLES[index],
      "address": `${locationX}, ${locationY}`,
      "price": randomRange(MIN_PRICE, MAX_PRICE),
      "type": TYPES[randomRange(0, TYPES.length - 1)],
      "rooms": randomRange(1, 5),
      "guests": randomRange(1, 5),
      "checkin": TIMES[randomRange(0, TIMES.length - 1)],
      "checkout": TIMES[randomRange(0, TIMES.length - 1)],
      "features": features,
      "description": `Замечательное жилье по координатам (${locationX}, ${locationY}) с ${features.join(`, `)}`,
      "photos": photos
    },
    "location": {
      "x": locationX,
      "y": locationY
    }
  };
};

const getMapMaxWidth = function () {
  return randomRange(0, mapWidth);
};

const renderOffer = function (offer) {
  const pinElement = pinItem.cloneNode(true);
  const imgElement = pinElement.querySelector(`img`);

  pinElement.style = `left: ${offer.location.x + PIN_OFFSET_X}px; top: ${offer.location.y + PIN_OFFSET_Y}px;`;
  imgElement.src = offer.author.avatar;
  imgElement.alt = offer.offer.title;

  return pinElement;
};

const makeFragment = function (offers) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < offers.length; i++) {
    const offerElement = renderOffer(offers[i]);

    fragment.appendChild(offerElement);
  }

  return fragment;
};

const compareOfferByY = function (firstOffer, secondOffer) {
  const firstY = firstOffer.location.y;
  const secondY = secondOffer.location.y;

  if (firstY < secondY) {
    return -1;
  }

  if (firstY > secondY) {
    return 1;
  }

  return 0;
};

const makeMockOffers = function () {
  shuffleArray(TITLES);
  shuffleArray(avatars);

  const elements = makeElements(SIZE_OF_MOCK, makeOffer);

  elements.sort(compareOfferByY);
  return elements;
};

const offers = makeMockOffers();

const showMapPins = function () {
  const fragmentWithOffers = makeFragment(offers);

  map.classList.remove(`map--faded`);
  mapPins.appendChild(fragmentWithOffers);
};

const hideMapPins = function () {
  const pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  map.classList.add(`map--faded`);
  pins.forEach(function (pin) {
    pin.remove();
  });
};

const renderTextPrice = function (offerInfo, newMapCard) {
  const priceEndingElement = document.createElement(`span`);
  const popupTextPrice = newMapCard.querySelector(`.popup__text--price`);

  popupTextPrice.textContent = `${offerInfo.price}₽`;
  priceEndingElement.textContent = `/ночь`;
  popupTextPrice.insertAdjacentElement(`beforeend`, priceEndingElement);
};

const renderFeatures = function (features, listContainer) {
  listContainer.innerHTML = ``;
  features.forEach(function (feature) {
    const listItem = document.createElement(`li`);

    listItem.classList.add(`popup__feature`);
    listItem.classList.add(`popup__feature--${feature}`);
    listContainer.appendChild(listItem);
  });
};

const renderPhotos = function (photos, photosContainer) {
  photosContainer.innerHTML = ``;
  photos.forEach(function (photo) {
    const image = cardTemplate.content.querySelector(`.popup__photo`).cloneNode(true);

    image.src = photo;
    photosContainer.appendChild(image);
  });
};

const makeTextTime = function (offerInfo) {
  return `Заезд после ${offerInfo.checkin}, выезд до ${offerInfo.checkout}`;
};

const makeTextCapacity = function (offerInfo) {
  return `${offerInfo.rooms} комнаты для ${offerInfo.guests} гостей`;
};

const renderMapCard = function (offer) {
  const newMapCard = mapCard.cloneNode(true);
  const offerInfo = offer.offer;

  newMapCard.querySelector(`.popup__title`).textContent = offerInfo.title;
  newMapCard.querySelector(`.popup__text--address`).textContent = offerInfo.address;

  renderTextPrice(offerInfo, newMapCard);

  newMapCard.querySelector(`.popup__type`).textContent = valuesType[offerInfo.type];
  newMapCard.querySelector(`.popup__text--capacity`).textContent = makeTextCapacity(offerInfo);
  newMapCard.querySelector(`.popup__text--time`).textContent = makeTextTime(offerInfo);
  newMapCard.querySelector(`.popup__description`).textContent = offerInfo.description;

  renderFeatures(offerInfo.features, newMapCard.querySelector(`.popup__features`));
  renderPhotos(offerInfo.photos, newMapCard.querySelector(`.popup__photos`));

  newMapCard.querySelector(`.popup__avatar`).src = offer.author.avatar;

  return newMapCard;
};

/* eslint-disable */
const showCard = function (offer) {
  map.insertBefore(renderMapCard(offer), filtersContainer);
};
/* eslint-enable */

const mapMainPin = document.querySelector(`.map__pin--main`);
const form = document.querySelector(`.ad-form`);
const formHeader = form.querySelector(`.ad-form-header`);
const formElements = form.querySelectorAll(`.ad-form__element`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFilters = mapFiltersForm.querySelectorAll(`.map__filter`);
const mapFeatures = mapFiltersForm.querySelectorAll(`.map__features`);
const formAddress = form.querySelector(`input[name=address]`);
const formCapacity = form.querySelector(`select[name=capacity]`);
const formRooms = form.querySelector(`select[name=rooms]`);
const formTitle = form.querySelector(`input[name=title]`);

mapMainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activatePage();
    setInputAddress();
  }
});

mapMainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === ENTER_KEYBOARD) {
    activatePage();
    setInputAddress();
  }
});

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
  if (!isActivePage) {
    return;
  }

  isActivePage = false;

  hideMapPins();
  disableInputs();
};

const activatePage = function () {
  if (isActivePage) {
    return;
  }

  isActivePage = true;

  showMapPins();
  enableInputs();
};

const setInputAddress = function () {
  let x = mapMainPin.offsetLeft;
  let y = mapMainPin.offsetTop;

  if (isActivePage) {
    x -= PIN_OFFSET_X;
    y -= PIN_OFFSET_Y;
  } else {
    x += Math.round(mapMainPin.clientWidth / 2);
    y += Math.round(mapMainPin.clientHeight / 2);
  }

  formAddress.value = `${x}, ${y}`;
};

deactivatePage();
setInputAddress();

const checkRoomValidity = function () {
  const capacity = +formCapacity.value;
  const rooms = +formRooms.value;
  let result = true;

  if ((rooms === 100 && capacity !== 0) || (rooms !== 100 && (capacity < 1 || capacity > rooms))) {
    formCapacity.setCustomValidity(roomValidityMessage[rooms]);
    result = false;
  } else {
    formCapacity.setCustomValidity(``);
  }
  formCapacity.reportValidity();

  return result;
};

formTitle.addEventListener(`invalid`, function () {
  const validity = formTitle.validity;

  if (validity.tooShort) {
    formTitle.setCustomValidity(SHORT_TITLE_MESSAGE);
  } else if (validity.tooLong) {
    formTitle.setCustomValidity(LONG_TITLE_MESSAGE);
  } else if (validity.valueMissing) {
    formTitle.setCustomValidity(MISSING_TITLE_MESSAGE);
  } else {
    formTitle.setCustomValidity(``);
  }
});

formCapacity.addEventListener(`change`, checkRoomValidity);
formRooms.addEventListener(`change`, checkRoomValidity);

form.addEventListener(`submit`, function (evt) {
  if (!checkRoomValidity()) {
    evt.preventDefault();
  }
});

'use strict';

const SIZE_OF_MOCK = 8;
const MAX_LOCATION_Y = 630;
const MIN_LOCATION_Y = 130;
const MAX_PRICE = 10500;
const MIN_PRICE = 1000;
const PIN_OFFSET_X = -25;
const PIN_OFFSET_Y = -70;

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

const VALUES_TYPE = {
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

const makeFragmetWithOffers = function (offers) {
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

  return makeElements(SIZE_OF_MOCK, makeOffer);
};

const offers = makeMockOffers();

const showPins = function () {
  // Показываем карту
  map.classList.remove(`map--faded`);

  // Сортируем объявления, чтобы верхние метки рисовались раньше
  offers.sort(compareOfferByY);

  // Создаем метки и помещаем на карту
  const fragmentWithOffers = makeFragmetWithOffers(offers);
  mapPins.appendChild(fragmentWithOffers);
};

const renderTextPriceWithOfferInfo = function (offerInfo, newMapCard) {
  const priceEndingElement = document.createElement(`span`);
  const popupTextPrice = newMapCard.querySelector(`.popup__text--price`);

  popupTextPrice.textContent = `${offerInfo.price}₽`;
  priceEndingElement.textContent = `/ночь`;
  popupTextPrice.insertAdjacentElement(`beforeend`, priceEndingElement);
};

const renderFeaturesWithOfferInfo = function (offerInfo, newMapCard) {
  const excludedFeatures = FEATURES.filter(function (value) {
    return !offerInfo.features.includes(value);
  });

  for (let i = 0; i < excludedFeatures.length; i++) {
    const className = `.popup__feature--${excludedFeatures[i]}`;
    const popupFeature = newMapCard.querySelector(className);

    popupFeature.classList.add(`hidden`);
  }
};

const renderPhotosWithOfferInfo = function (offerInfo, newMapCard) {
  const popupPhotos = newMapCard.querySelector(`.popup__photos`);

  if (offerInfo.photos.length > 0) {
    const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
    popupPhoto.src = offerInfo.photos[0];

    for (let i = 1; i < offerInfo.photos.length; i++) {
      const popupPhotoClone = popupPhoto.cloneNode();

      popupPhotoClone.src = offerInfo.photos[i];
      popupPhotos.appendChild(popupPhotoClone);
    }
  } else {
    popupPhotos.classList.add(`hidden`);
  }
};

const makeTextTime = function (offerInfo) {
  return `Заезд после ${offerInfo.checkin}, выезд до ${offerInfo.checkout}`;
};

const makeTextCapacity = function (offerInfo) {
  return `${offerInfo.rooms} комнаты для ${offerInfo.guests} гостей`;
};

const renderMapCardWithOffer = function (offer) {
  const newMapCard = mapCard.cloneNode(true);
  const offerInfo = offer.offer;

  newMapCard.querySelector(`.popup__title`).textContent = offerInfo.title;
  newMapCard.querySelector(`.popup__text--address`).textContent = offerInfo.address;

  renderTextPriceWithOfferInfo(offerInfo, newMapCard);

  newMapCard.querySelector(`.popup__type`).textContent = VALUES_TYPE[offerInfo.type];
  newMapCard.querySelector(`.popup__text--capacity`).textContent = makeTextCapacity(offerInfo);
  newMapCard.querySelector(`.popup__text--time`).textContent = makeTextTime(offerInfo);
  newMapCard.querySelector(`.popup__description`).textContent = offerInfo.description;

  renderFeaturesWithOfferInfo(offerInfo, newMapCard);
  renderPhotosWithOfferInfo(offerInfo, newMapCard);

  newMapCard.querySelector(`.popup__avatar`).src = offer.author.avatar;

  return newMapCard;
};

const showCard = function () {
  const newMapCard = renderMapCardWithOffer(offers[0]);

  map.insertBefore(newMapCard, filtersContainer);
};

showPins();
showCard();

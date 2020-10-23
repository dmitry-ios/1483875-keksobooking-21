'use strict';

const map = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`);
const mapCard = cardTemplate.content.querySelector(`.map__card`);
const filtersContainer = document.querySelector(`.map__filters-container`);

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

  newMapCard.querySelector(`.popup__type`).textContent = window.data.valuesType[offerInfo.type];
  newMapCard.querySelector(`.popup__text--capacity`).textContent = makeTextCapacity(offerInfo);
  newMapCard.querySelector(`.popup__text--time`).textContent = makeTextTime(offerInfo);
  newMapCard.querySelector(`.popup__description`).textContent = offerInfo.description;

  renderFeatures(offerInfo.features, newMapCard.querySelector(`.popup__features`));
  renderPhotos(offerInfo.photos, newMapCard.querySelector(`.popup__photos`));

  newMapCard.querySelector(`.popup__avatar`).src = offer.author.avatar;

  newMapCard.querySelector(`.popup__close`).addEventListener(`click`, function () {
    hideCard();
  });

  return newMapCard;
};

const hideCard = function () {
  let currentCard = map.querySelector(`.map__card`);

  if (currentCard) {
    document.removeEventListener(`keydown`, onEscapeCardPress);
    currentCard.remove();
    currentCard = null;
  }
};

const onEscapeCardPress = function (evt) {
  if (evt.key === window.constants.ESCAPE_KEYBOARD) {
    hideCard();
  }
};

const showCard = function (offer) {
  hideCard();

  document.addEventListener(`keydown`, onEscapeCardPress);

  map.insertBefore(renderMapCard(offer), filtersContainer);
};

window.card = {
  showCard,
  hideCard
};

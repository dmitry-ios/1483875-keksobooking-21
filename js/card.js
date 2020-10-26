'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`);
const mapCard = cardTemplate.content.querySelector(`.map__card`);
const filtersContainer = document.querySelector(`.map__filters-container`);

const renderTextPrice = (offerInfo, newMapCard) => {
  const priceEndingElement = document.createElement(`span`);
  const popupTextPrice = newMapCard.querySelector(`.popup__text--price`);

  popupTextPrice.textContent = `${offerInfo.price}₽`;
  priceEndingElement.textContent = `/ночь`;
  popupTextPrice.insertAdjacentElement(`beforeend`, priceEndingElement);
};

const renderFeatures = (features, listContainer) => {
  listContainer.innerHTML = ``;
  features.forEach((feature) => {
    const listItem = document.createElement(`li`);

    listItem.classList.add(`popup__feature`);
    listItem.classList.add(`popup__feature--${feature}`);
    listContainer.appendChild(listItem);
  });
};

const renderPhotos = (photos, photosContainer) => {
  photosContainer.innerHTML = ``;
  photos.forEach((photo) => {
    const image = cardTemplate.content.querySelector(`.popup__photo`).cloneNode(true);

    image.src = photo;
    photosContainer.appendChild(image);
  });
};

const makeTextTime = (offerInfo) => {
  return `Заезд после ${offerInfo.checkin}, выезд до ${offerInfo.checkout}`;
};

const makeTextCapacity = (offerInfo) => {
  return `${offerInfo.rooms} комнаты для ${offerInfo.guests} гостей`;
};

const renderMapCard = (offer) => {
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

  newMapCard.querySelector(`.popup__close`).addEventListener(`click`, () => {
    hideCard();
  });

  return newMapCard;
};

const discardActivePin = () => {
  const activePin = mapPins.querySelector(`.map__pin--active`);

  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const hideCard = () => {
  let currentCard = map.querySelector(`.map__card`);

  if (currentCard) {
    document.removeEventListener(`keydown`, onEscapeCardPress);
    currentCard.remove();
    currentCard = null;
  }

  discardActivePin();
};

const onEscapeCardPress = (evt) => {
  if (evt.key === window.constants.ESCAPE_KEYBOARD) {
    hideCard();
  }
};

const showCard = (offer) => {
  hideCard();

  document.addEventListener(`keydown`, onEscapeCardPress);

  map.insertBefore(renderMapCard(offer), filtersContainer);
};

window.card = {
  showCard,
  hideCard
};

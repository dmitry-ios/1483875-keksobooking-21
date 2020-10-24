'use strict';

const NUMBER_OF_PINS = 5;

const pinTemplate = document.querySelector(`#pin`);
const pinItem = pinTemplate.content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);
const errorTemplate = document.querySelector(`#error`).content;
const errorMessage = errorTemplate.querySelector(`.error`);
const successTemplate = document.querySelector(`#success`).content;
const successMessage = successTemplate.querySelector(`.success`);
const mainNode = document.querySelector(`main`);

const renderOffer = function (offer) {
  const pinElement = pinItem.cloneNode(true);
  const imgElement = pinElement.querySelector(`img`);

  pinElement.style = `left: ${offer.location.x + window.constants.PIN_OFFSET_X}px; top: ${offer.location.y + window.constants.PIN_OFFSET_Y}px;`;
  imgElement.src = offer.author.avatar;
  imgElement.alt = offer.offer.title;

  pinElement.addEventListener(`click`, function () {
    window.card.showCard(offer);
    pinElement.classList.add(`map__pin--active`);
  });

  return pinElement;
};

const makeFragment = function (elements) {
  const fragment = document.createDocumentFragment();
  const length = Math.min(elements.length, NUMBER_OF_PINS);

  for (let i = 0; i < length; i++) {
    const offerElement = renderOffer(elements[i]);

    fragment.appendChild(offerElement);
  }

  return fragment;
};

const setupSimilarPins = function (elements) {
  const fragmentWithOffers = makeFragment(elements);

  mapPins.appendChild(fragmentWithOffers);
};

const setupMessage = function (rootNode, textNode, text, closeButton) {
  const closeMessage = function () {
    rootNode.remove();
    window.removeEventListener(`keydown`, onMessageEscapePress);
  };

  const onMessageEscapePress = function (evt) {
    if (evt.key !== window.constants.ESCAPE_KEYBOARD) {
      return;
    }
    closeMessage();
  };

  rootNode.addEventListener(`click`, function () {
    closeMessage();
  });

  if (textNode && text) {
    textNode.textContent = text;
  }

  if (closeButton) {
    closeButton.addEventListener(`click`, function () {
      closeMessage();
    });
  }

  window.addEventListener(`keydown`, onMessageEscapePress);
  mainNode.insertAdjacentElement(`afterbegin`, rootNode);
};

const showErrorMessage = function (text) {
  const errorNode = errorMessage.cloneNode(true);
  const message = errorNode.querySelector(`.error__message`);
  const closeButton = errorNode.querySelector(`.error__button`);

  setupMessage(errorNode, message, text, closeButton);
};

const showSuccessMessage = function () {
  const successNode = successMessage.cloneNode(true);

  setupMessage(successNode);
};

window.render = {
  setupSimilarPins,
  showErrorMessage,
  showSuccessMessage
};

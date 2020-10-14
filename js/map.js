'use strict';

(function () {
  let isActivePage = true;

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`);
  const pinItem = pinTemplate.content.querySelector(`.map__pin`);

  const renderOffer = function (offer) {
    const pinElement = pinItem.cloneNode(true);
    const imgElement = pinElement.querySelector(`img`);

    pinElement.style = `left: ${offer.location.x + window.constants.PIN_OFFSET_X}px; top: ${offer.location.y + window.constants.PIN_OFFSET_Y}px;`;
    imgElement.src = offer.author.avatar;
    imgElement.alt = offer.offer.title;

    pinElement.addEventListener(`click`, function () {
      window.card.showCard(offer);
    });

    return pinElement;
  };

  const makeFragment = function (elements) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < elements.length; i++) {
      const offerElement = renderOffer(elements[i]);

      fragment.appendChild(offerElement);
    }

    return fragment;
  };

  const successLoadHandler = function (jsonData) {
    const fragmentWithOffers = makeFragment(jsonData);

    mapPins.appendChild(fragmentWithOffers);
  };

  const showMapPins = function () {
    window.backend.load(successLoadHandler, window.util.errorHandler);
  };

  const hideMapPins = function () {
    const pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.map = {
    isActivePage,
    mapNode: map,
    showMapPins,
    hideMapPins
  };
})();

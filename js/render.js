'use strict';

(function () {
  const NUMBER_OF_PINS = 5;

  const pinTemplate = document.querySelector(`#pin`);
  const pinItem = pinTemplate.content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);

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

  window.render = {
    setupSimilarPins
  };
})();

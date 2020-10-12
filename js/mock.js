'use strict';

(function () {
  const avatars = window.util.makeElements(window.constants.SIZE_OF_MOCK, window.util.generateAvatarUrl);

  const mapPins = document.querySelector(`.map__pins`);
  const mapWidth = mapPins.clientWidth;

  const getMapMaxWidth = function () {
    return window.util.randomRange(0, mapWidth);
  };

  const makeOffer = function (index) {
    window.util.shuffleArray(window.data.PHOTOS);
    window.util.shuffleArray(window.data.FEATURES);
    const maxFeatues = window.util.randomRange(1, window.data.FEATURES.length);
    const features = window.data.FEATURES.slice(0, maxFeatues);
    const maxPhotos = window.util.randomRange(1, window.data.PHOTOS.length);
    const photos = window.data.PHOTOS.slice(0, maxPhotos);
    const locationX = window.util.randomRange(0, getMapMaxWidth());
    const locationY = window.util.randomRange(window.constants.MIN_LOCATION_Y, window.constants.MAX_LOCATION_Y);
    return {
      "author": {
        "avatar": avatars[index]
      },
      "offer": {
        "title": window.data.TITLES[index],
        "address": `${locationX}, ${locationY}`,
        "price": window.util.randomRange(window.constants.MIN_PRICE, window.constants.MAX_PRICE),
        "type": window.data.TYPES[window.util.randomRange(0, window.data.TYPES.length - 1)],
        "rooms": window.util.randomRange(1, 5),
        "guests": window.util.randomRange(1, 5),
        "checkin": window.data.TIMES[window.util.randomRange(0, window.data.TIMES.length - 1)],
        "checkout": window.data.TIMES[window.util.randomRange(0, window.data.TIMES.length - 1)],
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
    window.util.shuffleArray(window.data.TITLES);
    window.util.shuffleArray(avatars);

    const elements = window.util.makeElements(window.constants.SIZE_OF_MOCK, makeOffer);

    elements.sort(compareOfferByY);
    return elements;
  };

  window.mock = {
    makeMockOffers
  };
})();

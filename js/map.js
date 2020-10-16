'use strict';

(function () {
  let isActivePage = true;

  let offers = [];
  let housingType = window.data.ANY_TYPE;

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);

  const successLoadHandler = function (jsonData) {
    offers = jsonData;

    if (offers.length > 0) {
      window.form.enableFilters();
    }

    updatePins();
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

  const updatePins = function () {
    hideMapPins();
    window.card.hideCard();

    const filteredOffers = offers.filter((offerInfo) => {
      return housingType === window.data.ANY_TYPE || offerInfo.offer.type === housingType;
    });

    window.render.setupSimilarPins(filteredOffers);
  };

  window.filter.setTypeChangeHandler(window.util.debounce(function (type) {
    housingType = type;
    updatePins();
  }));

  window.map = {
    isActivePage,
    mapNode: map,
    showMapPins,
    hideMapPins
  };
})();

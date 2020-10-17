'use strict';

(function () {
  let isActivePage = true;

  let offers = [];

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const mapFiltersForm = document.querySelector(`.map__filters`);

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

    const filteredOffers = window.filter.getFilteredOffers(offers);

    window.render.setupSimilarPins(filteredOffers);
  };

  mapFiltersForm.addEventListener(`change`, window.util.debounce(updatePins));

  window.map = {
    isActivePage,
    mapNode: map,
    showMapPins,
    hideMapPins
  };
})();

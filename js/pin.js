'use strict';

const mapPins = document.querySelector(`.map__pins`);
const mapFiltersForm = document.querySelector(`.map__filters`);

const successLoadHandler = function (jsonData) {
  window.data.offers = jsonData;

  if (jsonData.length > 0) {
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

  const filteredOffers = window.filter.getFilteredOffers(window.data.offers);

  window.render.setupSimilarPins(filteredOffers);
};

mapFiltersForm.addEventListener(`change`, window.util.debounce(updatePins));

window.pin = {
  showMapPins,
  hideMapPins
};

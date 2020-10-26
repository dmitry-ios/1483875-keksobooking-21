'use strict';

const mapPins = document.querySelector(`.map__pins`);
const mapFiltersForm = document.querySelector(`.map__filters`);

const successLoadHandler = (jsonData) => {
  window.data.offers = jsonData;

  if (jsonData.length > 0) {
    window.form.enableFilters();
  }

  updatePins();
};

const showMapPins = () => {
  window.backend.load(successLoadHandler, window.util.errorHandler);
};

const hideMapPins = () => {
  const pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((pin) => {
    pin.remove();
  });
};

const updatePins = () => {
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

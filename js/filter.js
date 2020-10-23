'use strict';

const map = document.querySelector(`.map`);
const housingTypeSelect = map.querySelector(`select[name=housing-type]`);
const housingRoomsSelect = map.querySelector(`select[name=housing-rooms]`);
const housingGuestsSelect = map.querySelector(`select[name=housing-guests]`);
const housingPriceSelect = map.querySelector(`select[name=housing-price]`);
const featuresCheckbox = document.querySelectorAll(`input[type=checkbox]`);

let currentFeatures = [];

const getFeatures = (element) => {
  if (currentFeatures.length === 0) {
    return true;
  }

  const includedFeatures = currentFeatures.filter((feature) => {
    return element.offer.features.includes(feature.value);
  });

  return includedFeatures.length === currentFeatures.length;
};

const getHousingPrice = (element) => {
  const price = element.offer.price;
  switch (housingPriceSelect.value) {
    case window.data.ANY_TYPE:
      return true;
    case `middle`:
      return price >= 10000 && price < 50000;
    case `low`:
      return price < 10000;
    case `high`:
      return price >= 50000;
    default:
      return false;
  }
};

const getHousingGuests = (element) => {
  return housingGuestsSelect.value === window.data.ANY_TYPE ? true : element.offer.guests === Number(housingGuestsSelect.value);
};

const getHousingRooms = (element) => {
  return housingRoomsSelect.value === window.data.ANY_TYPE ? true : element.offer.rooms === Number(housingRoomsSelect.value);
};

const getHousingType = (element) => {
  return housingTypeSelect.value === window.data.ANY_TYPE ? true : element.offer.type === housingTypeSelect.value;
};

const getFilteredOffers = (offers) => {
  currentFeatures = Array.from(featuresCheckbox).filter((element) => element.matches(`:checked`));

  return offers.filter((element) => {
    return getHousingType(element) && getHousingPrice(element) && getHousingRooms(element) && getHousingGuests(element) && getFeatures(element);
  });
};

window.filter = {
  getFilteredOffers
};

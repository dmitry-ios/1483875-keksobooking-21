'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const housingTypeSelect = map.querySelector(`select[name=housing-type]`);

  const getHousingType = (element) => {
    return housingTypeSelect.value === window.data.ANY_TYPE ? true : element.offer.type === housingTypeSelect.value;
  };

  const getFilteredOffers = (offers) => {
    return offers.filter((element) => {
      return getHousingType(element);
    });
  };

  window.filter = {
    getFilteredOffers
  };
})();

'use strict';

(function () {
  const doNothing = function () {
  };

  let filter = {
    onTypeChange: doNothing
  };

  const map = document.querySelector(`.map`);
  const housingTypeSelect = map.querySelector(`select[name=housing-type]`);

  housingTypeSelect.addEventListener(`change`, function () {
    filter.onTypeChange(housingTypeSelect.value);
  });

  const setTypeChangeHandler = function (cb) {
    filter.onTypeChange = cb;
  };

  window.filter = {
    setTypeChangeHandler
  };
})();

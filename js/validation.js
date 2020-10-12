'use strict';

(function () {
  const formCapacity = window.form.formNode.querySelector(`select[name=capacity]`);
  const formRooms = window.form.formNode.querySelector(`select[name=rooms]`);
  const formTitle = window.form.formNode.querySelector(`input[name=title]`);
  const formType = window.form.formNode.querySelector(`select[name=type]`);
  const formPrice = window.form.formNode.querySelector(`input[name=price]`);
  const formTimeIn = window.form.formNode.querySelector(`select[name=timein]`);
  const formTimeOut = window.form.formNode.querySelector(`select[name=timeout]`);

  const checkRoomValidity = function () {
    const capacity = +formCapacity.value;
    const rooms = +formRooms.value;
    let result = true;

    if ((rooms === 100 && capacity !== 0) || (rooms !== 100 && (capacity < 1 || capacity > rooms))) {
      formCapacity.setCustomValidity(window.data.roomValidityMessage[rooms]);
      result = false;
    } else {
      formCapacity.setCustomValidity(``);
    }
    formCapacity.reportValidity();

    return result;
  };

  formTitle.addEventListener(`invalid`, function () {
    const validity = formTitle.validity;

    if (validity.tooShort) {
      formTitle.setCustomValidity(window.constants.SHORT_TITLE_MESSAGE);
    } else if (validity.tooLong) {
      formTitle.setCustomValidity(window.constants.LONG_TITLE_MESSAGE);
    } else if (validity.valueMissing) {
      formTitle.setCustomValidity(window.constants.MISSING_TITLE_MESSAGE);
    } else {
      formTitle.setCustomValidity(``);
    }
  });

  const onSelectRoomChange = function () {
    checkRoomValidity();
  };

  const onSelectCapacityChange = function () {
    checkRoomValidity();
  };

  formCapacity.addEventListener(`change`, onSelectCapacityChange);
  formRooms.addEventListener(`change`, onSelectRoomChange);

  window.form.formNode.addEventListener(`submit`, function (evt) {
    if (!checkRoomValidity()) {
      evt.preventDefault();
    }
  });

  const setPricePlaceholder = function () {
    const currentMinPrice = window.data.minPrice[formType.value];
    formPrice.placeholder = currentMinPrice;
  };

  const checkPriceValidity = function () {
    const currentType = formType.value;
    const userPrice = formPrice.value;
    const currentMinPrice = window.data.minPrice[currentType];

    if (userPrice < currentMinPrice) {
      formPrice.setCustomValidity(`«${window.data.valuesType[currentType]}» — минимальная цена за ночь ${currentMinPrice}`);
    } else {
      formPrice.setCustomValidity(``);
    }
    formPrice.reportValidity();
  };

  const onSelectTypeChange = function () {
    setPricePlaceholder();
    checkPriceValidity();
  };

  const onSelectPriceInput = function () {
    checkPriceValidity();
  };

  formType.addEventListener(`change`, onSelectTypeChange);
  formPrice.addEventListener(`input`, onSelectPriceInput);

  setPricePlaceholder();

  const onSelectTimeinChange = function (evt) {
    formTimeOut.value = evt.target.value;
  };

  const onSelectTimeoutChange = function (evt) {
    formTimeIn.value = evt.target.value;
  };

  formTimeIn.addEventListener(`change`, onSelectTimeinChange);
  formTimeOut.addEventListener(`change`, onSelectTimeoutChange);
})();

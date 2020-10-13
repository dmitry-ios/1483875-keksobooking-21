'use strict';

(function () {
  const SIZE_OF_MOCK = 8;
  const MAX_LOCATION_Y = 630;
  const MIN_LOCATION_Y = 130;
  const MAX_PRICE = 10500;
  const MIN_PRICE = 1000;
  const PIN_OFFSET_X = -25;
  const PIN_OFFSET_Y = -70;
  const SHORT_TITLE_MESSAGE = `Минимальная длина — 30 символов`;
  const LONG_TITLE_MESSAGE = `Максимальная длина — 100 символов`;
  const MISSING_TITLE_MESSAGE = `Обязательное текстовое поле`;
  const LEFT_MOUSE_BUTTON = 0;
  const ENTER_KEYBOARD = `Enter`;
  const ESCAPE_KEYBOARD = `Escape`;

  window.constants = {
    SIZE_OF_MOCK,
    MAX_LOCATION_Y,
    MIN_LOCATION_Y,
    MAX_PRICE,
    MIN_PRICE,
    PIN_OFFSET_X,
    PIN_OFFSET_Y,
    SHORT_TITLE_MESSAGE,
    LONG_TITLE_MESSAGE,
    MISSING_TITLE_MESSAGE,
    LEFT_MOUSE_BUTTON,
    ENTER_KEYBOARD,
    ESCAPE_KEYBOARD
  };
})();
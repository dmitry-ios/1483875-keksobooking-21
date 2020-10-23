'use strict';

const randomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
};

const makeElements = function (limit, producer) {
  let elements = [];

  for (let i = 0; i < limit; i++) {
    elements[i] = producer(i);
  }

  return elements;
};

const generateAvatarUrl = function (index) {
  index += 1;
  let suffix = (index < 10) ? `0${index}` : index;
  return `img/avatars/user${suffix}.png`;
};

const errorHandler = function (errorMessage) {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; padding: 10px; margin: 0 auto; color: #fff; font-weight: 500; text-align: center; background-color: #f44336; border-radius: 4px;`;
  node.style.position = `absolute`;
  node.style.top = `5px`;
  node.style.left = `15px`;
  node.style.right = `15px`;
  node.style.fontSize = `30px`;

  node.textContent = `😲 ` + errorMessage;

  node.addEventListener(`click`, function () {
    node.remove();
  });

  window.scrollTo(0, 0);

  document.body.insertAdjacentElement(`afterbegin`, node);
};

const limitMapX = function (x) {
  x = Math.max(x, window.constants.PIN_OFFSET_X);
  x = Math.min(x, window.constants.MAP_WIDTH + window.constants.PIN_OFFSET_X);
  return x;
};

const limitMapY = function (y) {
  y = Math.max(y, window.constants.MIN_LOCATION_Y + window.constants.PIN_OFFSET_Y);
  y = Math.min(y, window.constants.MAX_LOCATION_Y + window.constants.PIN_OFFSET_Y);
  return y;
};

const DEBOUNCE_INTERVAL = 500;

const debounce = function (cb) {
  let lastTimeout = null;

  return function (...args) {
    let parameters = args;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  randomRange,
  shuffleArray,
  makeElements,
  generateAvatarUrl,
  errorHandler,
  limitMapX,
  limitMapY,
  debounce
};

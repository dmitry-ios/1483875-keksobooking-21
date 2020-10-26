'use strict';

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; padding: 10px; margin: 0 auto; color: #fff; font-weight: 500; text-align: center; background-color: #f44336; border-radius: 4px;`;
  node.style.position = `absolute`;
  node.style.top = `5px`;
  node.style.left = `15px`;
  node.style.right = `15px`;
  node.style.fontSize = `30px`;

  node.textContent = `😲 ` + errorMessage;

  node.addEventListener(`click`, () => {
    node.remove();
  });

  window.scrollTo(0, 0);

  document.body.insertAdjacentElement(`afterbegin`, node);
};

const limitMapX = (x) => {
  x = Math.max(x, window.constants.PIN_OFFSET_X);
  x = Math.min(x, window.constants.MAP_WIDTH + window.constants.PIN_OFFSET_X);
  return x;
};

const limitMapY = (y) => {
  y = Math.max(y, window.constants.MIN_LOCATION_Y + window.constants.PIN_OFFSET_Y);
  y = Math.min(y, window.constants.MAX_LOCATION_Y + window.constants.PIN_OFFSET_Y);
  return y;
};

const DEBOUNCE_INTERVAL = 500;

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    let parameters = args;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  errorHandler,
  limitMapX,
  limitMapY,
  debounce
};

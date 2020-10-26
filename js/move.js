'use strict';

const mapMainPin = document.querySelector(`.map__pin--main`);
const originTopPin = mapMainPin.style.top;
const originLeftPin = mapMainPin.style.left;

const resetPositionPin = () => {
  mapMainPin.style.top = originTopPin;
  mapMainPin.style.left = originLeftPin;
};

const updatePageState = () => {
  window.card.hideCard();
  window.form.setInputAddress();
};

const onMouseDown = (evt) => {
  updatePageState();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let x = window.util.limitMapX(mapMainPin.offsetLeft - shift.x);
    let y = window.util.limitMapY(mapMainPin.offsetTop - shift.y);

    mapMainPin.style.top = `${y}px`;
    mapMainPin.style.left = `${x}px`;
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    updatePageState();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mapMainPin.addEventListener(`mousedown`, onMouseDown);

window.move = {
  resetPositionPin
};

'use strict';

(function () {

  const startMove = function (element, updateCallback) {
    const onMouseDown = function (evt) {
      updateCallback();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let x = window.util.limitMapX(element.offsetLeft - shift.x);
        let y = window.util.limitMapY(element.offsetTop - shift.y);

        element.style.top = `${y}px`;
        element.style.left = `${x}px`;
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        updateCallback();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    };

    element.addEventListener(`mousedown`, onMouseDown);
  };

  window.move = {
    startMove
  };
})();

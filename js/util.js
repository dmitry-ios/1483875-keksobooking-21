'use strict';

(function () {
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

  window.util = {
    randomRange,
    shuffleArray,
    makeElements,
    generateAvatarUrl
  };
})();

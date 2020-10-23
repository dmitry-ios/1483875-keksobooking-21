'use strict';

const onFormSuccessLoad = function () {
  window.form.formNode.reset();
  window.card.hideCard();
  window.map.deactivatePage();
  window.move.resetPositionPin();
  window.form.setInputAddress();
  window.render.showSuccessMessage();
};

const onFormErrorLoad = function (error) {
  window.render.showErrorMessage(error);
};

window.form.formNode.addEventListener(`submit`, function (evt) {
  const formData = new FormData(window.form.formNode);

  window.backend.save(formData, onFormSuccessLoad, onFormErrorLoad);

  evt.preventDefault();
});

const resetButton = window.form.formNode.querySelector(`.ad-form__reset`);

resetButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();

  window.form.formNode.reset();
  window.form.setInputAddress();
});

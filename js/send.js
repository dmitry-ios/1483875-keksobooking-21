'use strict';

const resetPage = () => {
  window.form.formNode.reset();
  window.form.filterForm.reset();
  window.card.hideCard();
  window.map.deactivatePage();
  window.move.resetPositionPin();
  window.form.setInputAddress();
  window.preview.resetPreviews();
};

const onFormSuccessLoad = () => {
  resetPage();
  window.render.showSuccessMessage();
};

const onFormErrorLoad = (error) => {
  window.render.showErrorMessage(error);
};

window.form.formNode.addEventListener(`submit`, (evt) => {
  const formData = new FormData(window.form.formNode);

  window.backend.save(formData, onFormSuccessLoad, onFormErrorLoad);

  evt.preventDefault();
});

const resetButton = window.form.formNode.querySelector(`.ad-form__reset`);

resetButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  resetPage();
});

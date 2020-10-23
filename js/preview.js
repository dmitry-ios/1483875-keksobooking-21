'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const photoFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const makeImageInfo = function (text, width, height) {
  return {
    text,
    size: {
      width,
      height
    }
  };
};

const avatarInfo = makeImageInfo(`Аватар пользователя`, 40, 44);
const photoInfo = makeImageInfo(`Фотография жилья`, 70, 70);

const createImagePreview = function (source, info, previewNode) {
  const imageNode = document.createElement(`img`);

  imageNode.src = source;
  imageNode.width = info.size.width;
  imageNode.height = info.size.height;
  imageNode.alt = info.text;

  previewNode.appendChild(imageNode);
};

const setupFileChooser = function (fileChooser, preview, info) {
  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        preview.innerHTML = ``;
        createImagePreview(reader.result, info, preview);
      });

      reader.readAsDataURL(file);
    }
  });
};

setupFileChooser(avatarFileChooser, avatarPreview, avatarInfo);
setupFileChooser(photoFileChooser, photoPreview, photoInfo);

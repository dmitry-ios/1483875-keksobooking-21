const path = require(`path`);

module.exports = {
  entry: [
    `./js/constants.js`,
    `./js/util.js`,
    `./js/data.js`,
    `./js/backend.js`,
    `./js/mock.js`,
    `./js/card.js`,
    `./js/render.js`,
    `./js/filter.js`,
    `./js/form.js`,
    `./js/pin.js`,
    `./js/map.js`,
    `./js/move.js`,
    `./js/send.js`,
    `./js/validation.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

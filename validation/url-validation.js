const validator = require('validator');

const urlValidation = (value, err) => {
  if (validator.isURL(value)) {
    return value;
  }
  return err.message('Некорректная ссылка');
};

module.exports = urlValidation;

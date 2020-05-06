const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  title: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  text: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  date: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  source: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  link: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: function typeValidate(url) {
      return validator.isURL(url);
    },
  },
  image: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: function typeValidate(url) {
      return validator.isURL(url);
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);

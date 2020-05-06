const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const AuthFail = require('../errors/auth-fail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    unique: true,
    validate: function typeValidate(email) {
      return validator.isEmail(email);
    },
  },
  password: {
    type: String,
    minlength: [5],
    required: [true, 'Поле обязательно для заполнения'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Длина имени пользователя от 2 до 30 символов'],
    maxlength: [30, 'Длина имени пользователя от 2 до 30 символов'],
    required: [true, 'Поле обязательно для заполнения'],
  },
});

userSchema.statics.findUserByCredentials = function findByAuthParamets(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthFail('Ошибка авторизации');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthFail('Ошибка авторизации');
          }
          return user;
        });
    });
};

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

module.exports = mongoose.model('user', userSchema);

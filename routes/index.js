const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const users = require('./users');
const articles = require('./articles');
const wrongPage = require('./wrongPage');
const authorization = require('./authorization');

router.use('/articles', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
}), articles);

router.use('/users', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
}), users);

router.use('/', authorization);

router.use('*', wrongPage);

module.exports = router;

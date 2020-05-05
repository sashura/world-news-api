const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');

const {
  getUserArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', auth, getUserArticles);

router.post('/', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string()
      .required()
      .custom((value, err) => {
        if (validator.isURL(value)) {
          return value;
        }
        return err.message('Некорректная ссылка');
      }),
    image: Joi.string()
      .required()
      .custom((value, err) => {
        if (validator.isURL(value)) {
          return value;
        }
        return err.message('Некорректная ссылка');
      }),
  }),
}), createArticle);

router.delete('/:articleId', auth, celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = router;

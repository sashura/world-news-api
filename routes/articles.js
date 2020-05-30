const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const urlValidation = require('../validation/url-validation');

const {
  getUserArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/articles', auth, getUserArticles);

router.post('/articles', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string()
      .required()
      .custom(urlValidation),
    image: Joi.string()
      .required()
      .custom(urlValidation),
  }),
}), createArticle);

router.delete('/articles/:articleId', auth, celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().alphanum().length(24),
  }),
}), deleteArticle);


module.exports = router;

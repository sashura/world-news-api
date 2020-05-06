const Article = require('../models/article');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const Forbidden = require('../errors/forbidden');

const getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate({ path: 'owner', model: User })
    .then((data) => {
      if (data.length === 0) {
        throw new NotFoundError('У вас нет сохраненных новостей');
      }
      res.status(200).send(data);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ article }))
    .catch(next);
};


const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError('Новость не найдена'))
    .then((article) => {
      if (String(article.owner) !== req.user._id) {
        throw new Forbidden('Нет прав для удаления');
      }
      Article.findByIdAndDelete(req.params.articleId)
        .then(() => res.status(200).send({ message: 'Статья удалена' }));
    })
    .catch(next);
};

module.exports = {
  getUserArticles,
  createArticle,
  deleteArticle,
};

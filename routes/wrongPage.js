const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

router.all('/', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;

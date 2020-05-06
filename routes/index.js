const router = require('express').Router();

const users = require('./users');
const articles = require('./articles');
const wrongPage = require('./wrongPage');
const authorization = require('./authorization');

router.use('/articles', articles);

router.use('/users', users);

router.use('/', authorization);

router.use('*', wrongPage);

module.exports = router;

const router = require('express').Router();
const cors = require('cors');

const users = require('./users');
const articles = require('./articles');
const wrongPage = require('./wrongPage');
const authorization = require('./authorization');

router.use('/articles', cors(), articles);

router.use('/users', users);

router.use('/', authorization);

router.use('*', wrongPage);

module.exports = router;

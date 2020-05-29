const router = require('express').Router();
const cors = require('cors');

const users = require('./users');
const articles = require('./articles');
const wrongPage = require('./wrongPage');
const authorization = require('./authorization');

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(cors(corsOptions), articles);

router.use(users);

router.use(authorization);

router.use('*', wrongPage);

module.exports = router;

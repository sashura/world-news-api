const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsMiddleware = require('./middlewares/errorsmiddleware');

const router = require('./routes/index');

const { PORT, MONGO_DB, LIMITER } = require('./config');

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.options('*', cors(({ origin: true, credentials: true })));
app.use(rateLimit(LIMITER));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);

/*const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'localhost:8080',
  'localhost:8081',
  'http://localhost:8081',
  'https://localhost:8081',
  'http://localhost:8080',
  'https://localhost:8080',
];

const corsOptionDelegate =

app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  }
  next();
}); */

app.use('/', router);


app.use(errorLogger);
app.use(errors());

app.use(errorsMiddleware);

app.listen(PORT);

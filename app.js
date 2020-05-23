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
app.use(rateLimit(LIMITER));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);

/* const corsMiddle = ((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});*/

app.use('/', router);


app.use(errorLogger);
app.use(errors());

app.use(errorsMiddleware);

app.listen(PORT);

const jwt = require('jsonwebtoken');

const AuthFail = require('../errors/auth-fail');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return new AuthFail('Необходима авторизация');
  }
  req.user = payload;

  return next();
};

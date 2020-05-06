const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const ConflictError = require('../errors/conflict');

const createUser = (req, res, next) => {
  const {
    email, name,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ConflictError('Данный email уже загистрирован'));
      } else {
        next();
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'lax',
      });
    })
    .then(() => res.status(200).send({ message: 'Авторизация прошла успешно ' }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUser,
};

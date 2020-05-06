const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.CONNECTION_ADDRESS || 'mongodb://localhost:27017/worldnewsdb';
const LIMITER = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

module.exports = {
  PORT,
  MONGO_DB,
  LIMITER,
};

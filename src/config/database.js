const { resolve } = require('path');

module.exports = {
  database: 'follower',
  username: 'follower',
  password: 'follower',
  dialect: 'sqlite',
  storage: resolve(__dirname, '..', '..', 'follower.sqlite'),
};

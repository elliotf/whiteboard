module.exports = {
  db:     require('./base')
  , User: require('./user').User // must be loaded before Page
  , Page: require('./page').Page
};

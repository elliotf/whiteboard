var dot = require('dot-component')
;

var config = {
  app: {
    secret: 'a uuid would do well here'
  }
  , auth: {
    google: {
      secret: 'client secret from the google api/developer console'
      , id: 'client id from the google api/developer console'
      , fqdn: 'http://example.com'
    }
  }
  , database: {
    client: 'sqlite3'
  }
};

module.exports = function(key) {
  return dot.get(config, key);
};

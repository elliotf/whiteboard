var path = require('path')
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
    , connection: {
      filename: path.join(__dirname, 'dev.sqlite')
    }
  }
};

if (process.env.NODE_ENV === 'test') {
  config.database = {
    client: 'sqlite3'
    , connection: {
      filename: ":memory:"
    }
  };
}

module.exports = config;

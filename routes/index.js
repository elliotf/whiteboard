function register(app) {
  app.get('/', function(req, res, next){
    res.send('ok');
  });
};

module.exports = register;

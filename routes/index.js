function register(app) {
  app.get('/', function(req, res, next){
    res.render('lohp');
  });
}

module.exports = register;

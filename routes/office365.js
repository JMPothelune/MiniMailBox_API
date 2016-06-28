var express = require('express');
var router = express.Router();
var helper = require('../helpers/office365')
//const domain = "http://minimailbox.pony-makers.com"
const domain = "http://localhost:3000"

const redirectUri = domain + "/office365/redirect";


router.get('/login', function(req, res, next) {
  res.redirect(helper.getLoginURL(redirectUri));
});


router.get('/redirect', function(req, res, next) {
  access_code = req.query.code;

  helper.requestToken(access_code, redirectUri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // TODO store token to db
      // TODO redirect to correct scheme
      res.redirect("http://test/login?success=true");
    }else{
      // TODO redirect to correct scheme
      res.redirect("http://test/login?success=false");
    }
  });
});


module.exports = router;

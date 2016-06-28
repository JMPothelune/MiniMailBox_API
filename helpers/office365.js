var request = require('request');
var config = require('../config')

const clientId = config.office365.client_id;
const clientSecret = config.office365.client_secret;
const resource = "https://outlook.office365.com";

exports.getLoginURL = function(redirectUri) {
  return "https://login.microsoftonline.com/common/oauth2/authorize"
              + "?response_type=code"
              + "&client_id=" + clientId
              + "&redirect_uri=" + redirectUri
              + "&resource= " + resource;
};

exports.requestToken = function(accessCode, redirectUri, callback) {

  var options = {
    uri: 'https://login.microsoftonline.com/common/oauth2/token',
    method: 'POST',
    form: {
      "client_id": clientId,
      "resource": resource,
      "code": accessCode,
      "redirect_uri" : redirectUri,
      "grant_type": "authorization_code",
      "client_secret": clientSecret,
    }
  };

  request(options, callback);

}

var jwt = require('jsonwebtoken');
var secret = require('./secret.js')

var getToken=(usuario) =>{
    var token = jwt.sign({ usuario: usuario,expiresIn:'20h' }, secret.secret);
    return token
}

module.exports = {
    getToken:getToken
}
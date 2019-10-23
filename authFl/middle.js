var jwt = require('jsonwebtoken');
var secret = require('./secret.js')

var checkTocken = (req,res,next) => {
    var token = req.headers['auth'] || req.headers['x-access-token']|| req.headers['authorization']
    console.log(token)
    if (token){
        
        if (token.startsWith('Token ')){
            token=token.slice(6)
        }
        console.log(token)   
        jwt.verify(token,secret.secret,(err,decoded)=>{
            if(err){
                return res.json({
                    correcto:false,
                    message:'Token inválido'
                })
            }else{
                req.decoded=decoded;
                next();                
            }
        })
    }else{
        return res.json({
            correcto:false,
            message:'No hay token'
        })
    }
}

module.exports = {
    checkTocken:checkTocken
}
var router = require('express').Router();
var mssql = require('mssql');
var md5 = require('md5');
var middle = require('../authFl/middle')
var gentoken = require('../authFl/gentoken')


router.post('/',middle.checkTocken,(req,res)=>{
    res.send('éxito al autenticar')
})

router.post('/login',(req,res)=>{
    var SQLreq = new mssql.Request();
    console.log(req.body.usu+' - '+md5(req.body.pass))
    SQLreq.input('usu',mssql.VarChar,req.body.usu)
    SQLreq.input('pass',mssql.VarChar,md5(req.body.pass))
    SQLreq.query('SELECT * FROM USUARIOS WHERE USUARIO=@usu AND CONTRA=@pass',(err,rows)=>{
        
        //var result = [];
        //result.push({
        //    usuario: rows.recordset[0].USUARIO,
        //    contra: rows.recordset[0].CONTRA
        //});
        if(!err){
            if (rows.recordset.length!=0){
                res.send(gentoken.getToken(rows.recordset[0].USUARIO))
            }else{
                res.json({
                    estado:false,
                    mensaje:'UX - Usuario no encontrado'
                })
            }
        }else{
            res.json({
                //usuario:,
                estado:false
            })
        }
    })
})

module.exports=router;
var router = require('express').Router();
var mssql = require('mssql');
var middle = require('../authFl/middle')


//LISTAR CURSOS
router.get('/',middle.checkTocken,(req,res)=>{
    var SQLreq = new mssql.Request();
    SQLreq.query('SELECT * FROM CURSO',(err,rows)=>{
        if(!err){
            res.json(rows.recordset)
        }
    });
})

//LISTAR UN CURSO
router.get('/:id',middle.checkTocken,(req,res)=>{
    var SQLreq = new mssql.Request();
    SQLreq.input('idCurso',mssql.Int,req.params.id)
    SQLreq.query('SELECT * FROM CURSO WHERE ID_CURSO=@idCurso',(err,rows)=>{
        if(!err){
            res.json(rows.recordset)
            
        }
    });
})

//AGREGAR UN CURSO
router.post('/',(req,res)=>{
    var SQLreq = new mssql.Request();
    SQLreq.input('idS',mssql.Char,req.body.idS)
    SQLreq.input('desc',mssql.VarChar,req.body.desc)
    SQLreq.query('INSERT INTO CURSO(ID_SEMESTRE,DESCRIPCION) VALUES(@idS,@desc)',(err,rows)=>{
        if(!err){
            res.send(rows.rowsAffected)
        }else{
            console.log(err.message)
            res.send('ERROR: '+err.message)
        }
    });
})

router.post('/act',(req,res)=>{
    var SQLreq = new mssql.Request();
    SQLreq.input('idS',mssql.Char,req.body.idS);
    SQLreq.input('desc',mssql.VarChar,req.body.desc)
    SQLreq.input('idC',mssql.Int,req.body.idC)
    SQLreq.query('UPDATE CURSO SET ID_SEMESTRE=@idS, DESCRIPCION=@desc WHERE ID_CURSO=@idC',(err,rows)=>{
        if(!err){
            res.send(rows.rowsAffected)
        }else{
            console.log(err.message)
            res.send('Error '+err.name+':'+err.message)
        }
    })

})



module.exports = router;
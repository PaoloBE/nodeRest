var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var sql = require("mssql");
var cnfg = require("./config/db");

app.set('port', process.env.PORT||3000)

app.use(express.urlencoded({encoded:false}));
app.use(express.json());

app.use((req,res,next)=>{
    res.header({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
        'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, DELETE',
        'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
    })
    next()
});

app.use('/curs',require('./rutas/cursos'));
app.use('/usr',require('./rutas/usuarios'))

sql.connect(cnfg,(err,res)=>{
    if(!err){
        app.listen( app.get('port'),() => {console.log('Servido:',app.get('port'))} )
    } else {
        console.log('Error en:',err)
    }
})
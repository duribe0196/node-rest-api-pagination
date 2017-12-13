const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const rouTes = require('./routes/routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/paginacion',{
    useMongoClient: true
}).then(()=>{
    console.log("Conectado a la base de datos");
}).catch((err)=>{
    console.log("Error al conectarse a la base de datos");
});

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Routes
app.use(rouTes);

// Servidor
app.listen(app.get('port'),()=>{
    console.log("Servidor en el puerto ",app.get('port'));
});


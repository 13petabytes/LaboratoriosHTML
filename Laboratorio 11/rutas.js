const express = require('express');
const router = express.Router();

// Ruta para la página de inicio (index.html)
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para la página de "Lab5" (index_lab5.html)
router.get('/lab5', (req, res) => {
    res.sendFile(__dirname + '/index_lab5.html');
});

// Ruta para la página de contacto (contact.html)
router.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contacto.html');
});

//Dos frases en latin para llegar a las 5:
router.get('/Lorem_ipsum', (requiere, response) => {
    response.send(`<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.</h1>`);
});

router.get('/Ciceron', (requiere, response) =>{
    response.send('<h1>Non nobis solum nati sumus; ortusque nostri partem patria vindicat, partem amici.<h1><h2>Traducción: "No hemos nacido solo para nosotros mismos; nuestra patria reclama una parte de nuestro nacimiento, y nuestros amigos otra parte."<h2>')
})

// Ruta para 404 (página no encontrada)
router.get('*', (req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1>');
});

module.exports = router;

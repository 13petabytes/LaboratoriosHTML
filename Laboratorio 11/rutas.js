const express = require('express');
const router = express.Router();



// Página de inicio
router.get('/', (req, res) => {
    res.render('index', { titulo: 'Página Principal' });
});

// Página Lab5
router.get('/lab5', (req, res) => {
    res.render('index_lab5', { titulo: 'Respeustas Preguntas' });
});

// Página de contacto
router.get('/contact', (req, res) => {
    res.render('contacto', { titulo: 'Contacto' });
});

// Frases en latín
router.get('/Lorem_ipsum', (req, res) => {
    res.render('Lore_ipsum',{titulo: 'Lore Ipsum'});
});

router.get('/Ciceron', (req, res) => {
    res.render('Ciceron', {titulo: 'Frase de Ciceron'});
});

// Página 404
router.use((req, res) => {
    res.status(404).render('Error 404', { titulo: 'Página No Encontrada' });
});

module.exports = router;

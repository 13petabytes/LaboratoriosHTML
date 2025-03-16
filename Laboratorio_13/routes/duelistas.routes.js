const express = require('express');
const router = express.Router();

const duelistas_controller = require('../controllers/duelistas.controller');

// Ruta para agregar un duelista (GET)
router.get('/agregar', duelistas_controller.get_agregar);

// Ruta para agregar un duelista (POST)
router.post('/agregar', duelistas_controller.post_agregar);

// Ruta para mostrar la lista de duelistas
router.get('/mostrar', duelistas_controller.get_mostrar);

// Ruta para la lista de duelistas en la página principal
router.get('/', duelistas_controller.get_lista);

module.exports = router;

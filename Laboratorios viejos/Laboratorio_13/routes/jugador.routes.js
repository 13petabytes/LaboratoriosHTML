const express = require('express');
const router = express.Router();
const jugador_controller = require('../controllers/jugador.controller');  // Asegúrate de que la ruta es correcta

// Rutas de login
router.get('/login', jugador_controller.get_login);
router.post('/login', jugador_controller.post_login);
router.get('/logout', jugador_controller.get_logout);

module.exports = router;

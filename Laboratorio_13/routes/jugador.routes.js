const express = require('express');
const router = express.Router();
const jugador_controller = require('../controllers/jugador.controller');

// Rutas de signup y login
router.get('/signup', jugador_controller.get_signup);
router.post('/signup', jugador_controller.post_signup);
router.get('/login', jugador_controller.get_login);
router.post('/login', jugador_controller.post_login);
router.get('/logout', jugador_controller.get_logout);

module.exports = router;

const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugador.controller');

// Signup
router.get('/signup', jugadorController.get_signup);
router.post('/signup', jugadorController.post_signup);

// Login
router.get('/login', jugadorController.get_login);
router.post('/login', jugadorController.post_login);

// Logout
router.get('/logout', jugadorController.get_logout);

module.exports = router;

const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canCreateDuelista = require('../util/canCreateDuelista');
const canViewDuelista = require('../util/canViewDuelista');

const duelistas_controller = require('../controllers/duelistas.controller');

// Mostrar el HTML base
router.get('/mostrar', isAuth, duelistas_controller.get_mostrar);

// Formulario para agregar duelistas
router.get('/agregar', isAuth, canCreateDuelista, duelistas_controller.get_agregar);
router.get('/add', isAuth, canCreateDuelista, duelistas_controller.get_agregar);

// Guardar nuevo duelista
router.post('/agregar', isAuth, canCreateDuelista, duelistas_controller.post_agregar);

// Buscar duelistas (AJAX, por nombre)
router.get('/buscar/:nombre', isAuth, canViewDuelista, duelistas_controller.get_buscar);

// Ver un duelista por ID
router.get('/:id', isAuth, canViewDuelista, duelistas_controller.get_lista);

// Ver lista completa
router.get('/', isAuth, canViewDuelista, duelistas_controller.get_lista);

module.exports = router;

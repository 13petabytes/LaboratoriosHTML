const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canCreateDuelista = require('../util/canCreateDuelista');
const canViewDuelista = require('../util/canViewDuelista');

const duelistas_controller = require('../controllers/duelistas.controller');

// Rutas GET
router.get('/agregar', isAuth, canCreateDuelista, duelistas_controller.get_agregar);
router.get('/add', isAuth, canCreateDuelista, duelistas_controller.get_agregar);

router.post('/agregar', isAuth, canCreateDuelista, duelistas_controller.post_agregar);

router.get('/mostrar', isAuth, duelistas_controller.get_mostrar);
router.get('/:id', isAuth, canViewDuelista, duelistas_controller.get_lista);
router.get('/', isAuth, canViewDuelista, duelistas_controller.get_lista);



module.exports = router;

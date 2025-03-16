const express = require('express');
const router = express.Router();


const duelistas_controller = require('../controllers/duelista.controles');

//Cuando se registra un middleware con app.get(), 
//el middleware sólo se registra para el método HTTP GET
router.get('/agregar', duelistas_controller.get_agregar);


//Cuando se registra un middleware con app.post(), 
//el middleware sólo se registra para el método HTTP POST
router.post('/agregar', duelistas_controller.post_agregar);

router.get('/mostrar', duelistas_controller.get_mostrar);

router.get('/duelista', duelistas_controller.get_lista);

router.get('/lab5', duelistas_controller.get_preguntas);

router.get('/', duelistas_controller.get_inicio);

module.exports = router;

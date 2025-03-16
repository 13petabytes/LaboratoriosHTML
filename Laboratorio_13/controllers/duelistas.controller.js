const Duelista = require('../models/duelista.model');

// Renderiza la vista de agregar duelista
exports.get_agregar = (request, response, next) => {
    response.render('agregar_duelista');  // Asegúrate de que 'agregar_duelista' sea el nombre correcto de la vista
};

// Maneja el formulario para agregar un duelista
exports.post_agregar = (request, response, next) => {
    console.log(request.body);
    const duelista = new Duelista(request.body.nombre, request.body.url);  // Asegúrate de que se pasa la URL correctamente
    duelista.save();
    console.log(Duelista.fetchAll());
    response.redirect('/');  // Redirige a la página principal con la lista de duelistas
};

// Renderiza la lista de duelistas
exports.get_lista = (request, response, next) => { 
    response.render('lista_duelistas', {
        duelistas: Duelista.fetchAll(),
    });
};

// Muestra la página de inicio
exports.get_mostrar = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

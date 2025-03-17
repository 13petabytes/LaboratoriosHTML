const Duelista = require('../models/duelista.model');

// Renderiza la vista de agregar duelista
exports.get_agregar = (request, response, next) => {
    console.log(request.session);
    response.render('agregar_duelista',{
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
    });  // Asegúrate de que 'agregar_duelista' sea el nombre correcto de la vista
};

// Maneja el formulario para agregar un duelista
exports.post_agregar = (request, response, next) => {
    console.log(request.body);
    const duelista = new Duelista(request.body.nombre, request.body.url);  // Asegúrate de que se pasa la URL correctamente
    duelista.save();

    response.setHeader('Set-Cookie', `ultimo_personaje=${personaje.nombre}`);

    console.log(Duelista.fetchAll());
    response.redirect('/duelistas');  
};

// Renderiza la lista de duelistas
exports.get_lista = (request, response, next) => { 
    console.log(request.get('Cookie'));
    response.render('lista_duelistas', {
        duelistas: Duelista.fetchAll(),
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
    });
};
// Muestra la página de inicio
exports.get_mostrar = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

const Duelista = require('../models/duelista.model'); 

exports.get_agregar = (request, response, next) => {
    console.log(request.session);
    response.render('agregar_duelista', {  
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
    });
};

exports.post_agregar = (request, response, next) => {
    console.log(request.body);
    const duelista = new Duelista(request.body.nombre); 
    duelista.save()
        .then(() => {
            request.session.info = `Duelista ${duelista.nombre} guardado.`; 
            response.redirect('/duelistas');
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.get_lista = (request, response, next) => { 
    const mensaje = request.session.info || '';
    if (request.session.info) {
        request.session.info = '';
    }

    Duelista.fetch(request.params.id)
        .then(([rows, fielData]) => {
            console.log(fielData);
            console.log(rows);
            response.render('lista_duelistas', { 
                duelistas: rows, 
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || '',
                info: mensaje,
                privilegios: request.session.privilegios || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.get_mostrar = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

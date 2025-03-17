const Jugador = require('../models/jugador.model');
const bcrypt = require('bcryptjs');

exports.get_signup = (request, response, next) => {
    response.render('login.ejs', {
        isLoggedIn: request.session.isLoggedIn || false,
        nombre: request.session.nombre || '', // Se cambió 'username' a 'nombre'
        isNew: true,
        csrfToken: request.csrfToken(),
    });
};

exports.post_signup = (request, response, next) => {
    const nuevo_jugador = new Jugador(request.body.nombre, request.body.contrasenia);

    nuevo_jugador.save().then(() => {
        response.redirect('/jugador/login');
    }).catch((error) => {
        console.log(error);
    });
};

exports.get_login = (request, response, next) => {
    response.render('login.ejs', {
        isLoggedIn: request.session.isLoggedIn || false,
        nombre: request.session.nombre || '',  // Se cambió 'username' a 'nombre'
        isNew: false,
        csrfToken: request.csrfToken(), // Incluir el CSRF token en el renderizado
    });
};

exports.post_login = (request, response, next) => {
    Jugador.fetchOne(request.body.nombre).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            bcrypt.compare(request.body.contrasenia, rows[0].contrasenia)
                .then((doMatch) => {
                    if (doMatch) {
                        request.session.nombre = rows[0].nombre; // Guardamos el nombre del jugador
                        request.session.isLoggedIn = true;
                        return request.session.save(err => {
                            response.redirect('/duelistas');
                        });
                    } else {
                        response.redirect('/jugador/login');
                    }
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            response.redirect('/jugador/login');
        }
    }).catch((error) => {
        console.log(error);
    });
};


exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        // Este código se ejecuta cuando la sesión se elimina
        response.redirect('/jugador/login');
    });
};

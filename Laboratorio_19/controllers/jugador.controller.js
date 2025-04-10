const Jugador = require('../models/jugador.model'); // Se mantiene el modelo con el nombre actualizado
const bcrypt = require('bcryptjs');

exports.get_signup = (request, response, next) => {
    response.render('login.ejs', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        isNew: true,
        csrfToken: request.csrfToken(),
    });
};

exports.post_signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        console.log("Contraseña original:", req.body.password);
        console.log("Contraseña hasheada:", hashedPassword);

        const nuevo_jugador = new Jugador(req.body.username, hashedPassword);
        await nuevo_jugador.save();

        res.redirect('/jugador/login');
    } catch (error) {
        console.log("Error al registrar jugador:", error);
        res.redirect('/jugador/signup');
    }
};



exports.get_login = (request, response, next) => {
    response.render('login.ejs', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        isNew: false,
        csrfToken: request.csrfToken(),
    });
};

exports.post_login = (request, response, next) => {
    console.log('POST login llamado');
    console.log('Username:', request.body.username);
    console.log('Password:', request.body.password);

    // Buscar al jugador en la base de datos
    Jugador.fetchOne(request.body.username).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            console.log('Usuario encontrado:', rows[0]);

            // Aquí comparamos la contraseña en texto plano sin usar bcrypt
            if (request.body.password === rows[0].password) {
                // Si la contraseña es correcta, iniciar sesión
                request.session.username = rows[0].username;
                request.session.isLoggedIn = true;

                // Obtener los privilegios del usuario
                Jugador.getPrivilegios(rows[0].username).then(([privilegios, fieldData]) => {
                    request.session.privilegios = [];

                    // Guardamos los privilegios en la sesión
                    for (let privilegio of privilegios) {
                        request.session.privilegios.push(privilegio);
                    }

                    // Guardamos la sesión y redirigimos a /duelistas
                    return request.session.save(err => {
                        if (err) {
                            console.log('Error guardando la sesión:', err);
                            response.redirect('/jugador/login');
                        } else {
                            console.log('Sesión guardada correctamente.');
                            response.redirect('/duelistas'); // Cambié a redirección aquí
                        }
                    });
                }).catch((error) => {
                    console.log('Error obteniendo privilegios:', error);
                    response.redirect('/jugador/login');
                });
            } else {
                // Si la contraseña no es correcta, redirigimos al login
                console.log('Password incorrecta');
                response.redirect('/jugador/login');
            }
        } else {
            // Si el usuario no se encuentra, redirigimos al login
            console.log('Usuario no encontrado');
            response.redirect('/jugador/login');
        }
    }).catch((error) => {
        console.log('Error en fetchOne:', error);
        response.redirect('/jugador/login');
    });
};




exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        // Este código se ejecuta cuando la sesión se elimina.
        response.redirect('/jugador/login'); 
    });
};

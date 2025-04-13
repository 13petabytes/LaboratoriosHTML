const Duelista = require('../models/duelista.model');
const fs = require('fs');
const path = require('path');

// Mostrar formulario para agregar un duelista
exports.get_agregar = (req, res) => {
    res.render('agregar_duelista', {
        titulo: 'Agregar Duelista',
        csrfToken: req.csrfToken(),
    });
};

// Guardar nuevo duelista
exports.post_agregar = (req, res) => {
    const nombre = req.body.nombre;
    let imagen = null;

    if (req.file) {
        imagen = fs.readFileSync(path.join(__dirname, '..', 'public', 'uploads', req.file.filename));
    }

    const duelista = new Duelista(nombre, imagen);
    duelista.save()
        .then(() => {
            res.redirect('/agregar_duelista');
        })
        .catch(err => console.log(err));
};

// Lista de duelistas
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

// Ver detalles de un duelista por su ID
exports.get_duelista = (req, res) => {
    const id = req.params.id;
    Duelista.fetch(id)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                return res.status(404).send('Duelista no encontrado');
            }

            res.render('lista_duelistas', {
                duelista: rows[0],
                privilegios: req.session.privilegios || [],
            });
        })
        .catch(err => console.log(err));
};

// Buscar duelista por nombre
exports.get_buscar = (req, res) => {
    const nombre = (req.params.nombre || '').trim(); // Asegura que siempre sea string

    const procesarYEnviar = (rows) => {
        const duelistasProcesados = rows.map(duelista => {
            return {
                ...duelista,
                imagen: duelista.imagen
                    ? Buffer.from(duelista.imagen).toString('base64')
                    : null
            };
        });

        res.json({ duelistas: duelistasProcesados });
    };

    if (nombre === "") {
        // Si el nombre está vacío, traer todos los duelistas
        Duelista.fetchAll()
            .then(([rows]) => procesarYEnviar(rows))
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener todos los duelistas' });
            });
    } else {
        // Si hay texto, buscar por nombre
        Duelista.buscarPorNombre(nombre)
            .then(([rows]) => procesarYEnviar(rows))
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Error al buscar duelistas' });
            });
    }
};



// Redirigir a la vista principal de la página
exports.get_mostrar = (req, res) => {
    const path = require('path');
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

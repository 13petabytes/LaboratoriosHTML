// middleware/auth.js
const { obtenerPermisos } = require('../db/queries');

// Middleware para cargar los permisos del jugador en cada solicitud
const cargarPermisos = async (req, res, next) => {
    if (!req.session.jugador) return next(); // Si no hay jugador logueado, sigue con la petición

    req.session.permisos = await obtenerPermisos(req.session.jugador.id); // Cargar permisos del jugador
    next(); // Continuar con la solicitud
};

// Middleware para verificar si el jugador está autenticado
const verificarAutenticacion = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/jugador/login'); // Redirigir al login si no está autenticado
    }
    next(); // Si está autenticado, continuar con la solicitud
};

module.exports = { cargarPermisos, verificarAutenticacion };

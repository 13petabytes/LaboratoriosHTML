// controllers/jugador.controller.js
const db = require('../db/dbConnection');
const bcrypt = require('bcrypt'); // Usamos bcrypt para comparar contraseñas

// Ruta para mostrar el formulario de login
const get_login = (req, res) => {
    res.render('login'); // Asegúrate de tener una vista 'login.ejs'
};

// Ruta para manejar el login
const post_login = async (req, res) => {
    const { nombre, contrasenia } = req.body;

    // Consulta para encontrar el jugador por nombre
    const [jugador] = await db.promise().query('SELECT * FROM Jugadores WHERE nombre = ?', [nombre]);

    if (!jugador) {
        return res.status(401).render('login', { error: 'Jugador no encontrado' });
    }

    // Compara la contraseña ingresada con la almacenada en la base de datos
    const esValida = await bcrypt.compare(contrasenia, jugador.contrasenia);
    
    if (!esValida) {
        return res.status(401).render('login', { error: 'Contraseña incorrecta' });
    }

    // Establecer la sesión del jugador
    req.session.jugador = jugador.id;  // Guardar ID del jugador en la sesión
    req.session.jugadorNombre = jugador.nombre;  // Guardar nombre del jugador en la sesión
    req.session.isLoggedIn = true;  // Marcar que el jugador está logueado

    // Redirigir a la página principal o al dashboard del jugador
    res.redirect('/jugador/dashboard');  // Ajusta la ruta según sea necesario
};

// Ruta para manejar el logout
const get_logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/jugador/login');  // Redirigir al login después de hacer logout
    });
};

module.exports = {
    get_login,
    post_login,
    get_logout
};

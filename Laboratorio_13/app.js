const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const { cargarPermisos } = require('./middleware/auth'); // Importar el middleware

// Configuración de CSRF
const csrfProtection = csrf();
app.use(csrfProtection); 

// Configuración de la sesión
app.use(session({
    secret: 'odio el deck hero',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Asegúrate de que sea false en desarrollo
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Middleware global para inyectar variables de sesión y csrfToken
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.jugadorNombre = req.session.jugadorNombre || null;
    res.locals.csrfToken = req.csrfToken(); // Asegúrate de incluir el csrfToken
    next();
});

// Middleware para cargar permisos de jugador
app.use(cargarPermisos); // Este middleware es responsable de cargar los permisos del jugador

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de EJS para la vista
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const rutasDuelistas = require('./routes/duelistas.routes');
app.use('/duelistas', rutasDuelistas);

const rutasJugador = require('./routes/jugador.routes');
app.use('/jugador', rutasJugador);

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.jugadorNombre = req.session.jugadorNombre || null;
    res.locals.csrfToken = req.csrfToken(); // Asegúrate de incluir el csrfToken
    next();
});


// Middleware 404 - Si la ruta no es encontrada
app.use((req, res) => {
    res.status(404).render('Error 404', { message: 'Página no encontrada' });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

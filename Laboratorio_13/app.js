const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 


// Configura la sesión
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

// Usa csrfProtection globalmente si lo necesitas en toda la app
app.use(csrfProtection);

// Middleware para inyectar variables de sesión y csrfToken
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.userName = req.session.userName || null;
    res.locals.csrfToken = req.csrfToken(); // Asegúrate de incluir el csrfToken
    next();
});

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
const rutasDuelistas = require('./routes/duelistas.routes');
app.use('/duelistas', rutasDuelistas);

const rutasJugador = require('./routes/jugador.routes');
app.use('/jugador', rutasJugador);

// Middleware 404
app.use((req, res) => {
    res.status(404).render('Error 404', { message: 'Página no encontrada' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const app = express();

// Configuración de CSRF
const csrfProtection = csrf();
app.use(csrfProtection); 

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de EJS para la vista
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const session = require('express-session');

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


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

const { cargarPermisos } = require('./middleware/auth'); // Importar el middleware


// Middleware para cargar permisos de jugador
app.use(cargarPermisos); // Este middleware es responsable de cargar los permisos del jugador

const rutasDuelistas = require('./routes/duelistas.routes');
app.use('/duelistas', rutasDuelistas);

const rutasJugador = require('./routes/jugador.routes');
app.use('/jugador', rutasJugador);

// Middleware 404 - Si la ruta no es encontrada
app.use((req, res) => {
    res.status(404).render('Error 404', { message: 'Página no encontrada' });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

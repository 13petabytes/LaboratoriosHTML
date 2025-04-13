const express = require('express');
const app = express();
const path = require('path');

// Carpeta pública para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Sesión
const session = require('express-session');
app.use(session({
    secret: 'AAAAAAA ODIO EL DECK HERO',
    resave: false,
    saveUninitialized: false,
}));

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // por si se usa JSON en AJAX

// Multer para subida de imágenes
const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        // Prevenir nombres repetidos
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});
app.use(multer({ storage: fileStorage }).single('imagen')); // 'imagen' es el name del input

// CSRF (después de session y bodyParser)
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection);

// Rutas
const rutasJugadores = require('./routes/jugador.routes');
const rutasDuelistas = require('./routes/duelistas.routes');
app.use('/jugador', rutasJugadores);
app.use('/duelistas', rutasDuelistas);

// Middleware 404
app.use((req, res, next) => {
    res.status(404).render('Error 404', { message: 'Página no encontrada' });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

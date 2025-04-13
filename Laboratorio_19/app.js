const express = require('express');
const app = express();
const path = require('path');

// Carpeta estática
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Session primero
const session = require('express-session');
app.use(session({
    secret: 'AAAAAAA ODIO EL DECK HERO',
    resave: false,
    saveUninitialized: false,
}));

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Multer para archivos
const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
app.use(multer({ storage: fileStorage }).single('imagen'));

// CSRF debe ir después de sesión y bodyParser
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection);

// Rutas
const rutasJugadores = require('./routes/jugador.routes');
const rutasDuelistas = require('./routes/duelistas.routes');
app.use('/jugador', rutasJugadores);
app.use('/duelistas', rutasDuelistas);



// Error 404
app.use((req, res, next) => {
    res.status(404).render('Error 404', { message: 'Página no encontrada' });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

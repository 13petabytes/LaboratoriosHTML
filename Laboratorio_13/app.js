const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); 

const session = require('express-session');

app.use(session({
    secret: 'odio el deck hero', 
    resave: false,
    saveUninitialized: false,
     cookie: {
         httpOnly: true,
         secure: false,
         maxAge: 24 * 60 * 60 * 1000
     }
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.userName = req.session.userName || null;
    next();
});

app.get('/', (request, response, next) => {
    response.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    });
    
    response.render('index', { 
        title: 'Inicio',
        lastVisit: request.cookies.lastVisit || 'Primera visita'
    });
});

// Importar rutas
const rutasDuelistas = require('./routes/duelistas.routes'); 
app.use('/duelistas', rutasDuelistas);

const rutasJugador = require('./routes/jugador.routes');
app.use('/jugador', rutasJugador);

// Middleware 404 al final
app.use((req, res) => {
    res.status(404).render('Error 404', { message: 'Página no encontrada' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
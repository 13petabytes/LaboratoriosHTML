const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');

app.use(session({
    secret: 'odio el deck hero', 
    resave: false,
    saveUninitialized: false,
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

// Rutas de jugadores (login, signup, logout)
const rutasJugadores = require('./routes/jugador.routes');
app.use('/jugador', rutasJugadores);

// Rutas de duelistas (crear, listar personajes)
const rutasDuelistas = require('./routes/duelistas.routes');
app.use('/duelistas', rutasDuelistas);


app.use((request, response, next) => {
    console.log('Otro middleware!');
    
    response.status(404).render('Error 404', { message: 'Página no encontrada' }); 
});

app.listen(3001);
                    
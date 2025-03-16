const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

const rutasDuelistas = require('./routes/duelistas.routes'); // Importar rutas
// Usar rutas de duelistas
app.use('/duelistas', rutasDuelistas);

// Middleware 404 al final
app.use((req, res) => {
    res.status(404).render('Error 404', { message: 'Página no encontrada' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

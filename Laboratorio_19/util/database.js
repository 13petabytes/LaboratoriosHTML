const mysql = require('mysql2');

// Crear un pool de conexiones con la base de datos yugioh_db
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  //usuario de MySQL
    database: 'yugioh_db',  // Nombre de la base de datos
    password: '120804',  //contraseña de MySQL
});

// Exportar el pool configurado para ser usado en otras partes del código
module.exports = pool.promise();

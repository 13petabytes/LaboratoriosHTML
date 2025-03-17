const mysql = require('mysql2');

// Crear un pool de conexiones con la base de datos yugioh_db
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  // Tu usuario de MySQL
    database: 'yugioh_db',  // Nombre de la base de datos
    password: '120804',  // Tu contraseña de MySQL (vacía si no tiene contraseña)
    authPlugins: {
        mysql_native_password: mysql.authPlugins.mysql_native_password
    }
});

// Exportar el pool configurado para ser usado en otras partes del código
module.exports = pool.promise();

// db/queries.js
const db = require('./dbConnection'); // Asegúrate de tener la conexión a la base de datos

const obtenerPermisos = async (jugadorId) => {
    const permisos = await db.query(`
        SELECT p.nombre FROM Permisos p
        JOIN RolePermissions rp ON p.id = rp.permission_id
        JOIN JugadorRoles jr ON rp.role_id = jr.role_id
        WHERE jr.jugador_id = ?`, [jugadorId]);
    
    return permisos.map(p => p.nombre);
};

module.exports = { obtenerPermisos };

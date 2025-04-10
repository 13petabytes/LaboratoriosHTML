module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/jugador/login');
    }
    next();    
};

const obtenerPermisos = async (jugadorId) => {
    const permisos = await db.query(`
        SELECT p.nombre FROM Permisos p
        JOIN RolePermissions rp ON p.id = rp.permission_id
        JOIN JugadorRoles jr ON rp.role_id = jr.role_id
        WHERE jr.jugador_id = ?`, [jugadorId]);
    
    return permisos.map(p => p.nombre);
};

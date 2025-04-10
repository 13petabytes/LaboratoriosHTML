module.exports = (request, response, next) => {
    let canCreate = false;
    for (let privilegio of request.session.privilegios) {
        if (privilegio.nombre == "observador") {
            canCreate = true;
            next();
        }
    }
    if (!canCreate) {
        return response.status(403).send("Hereje detectado. No puedes ver esta página.");    
    }
};
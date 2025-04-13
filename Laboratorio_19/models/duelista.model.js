const db = require('../util/database');

module.exports = class Duelista {

    // Constructor para crear un nuevo duelista
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
    }

    // Guarda el duelista en la base de datos
    save() {
        return db.execute(
            'INSERT INTO duelistas (nombre, imagen) VALUES (?, ?)', 
            [this.nombre, this.imagen]
        );
    }

    // Devuelve todos los duelistas
    static fetchAll() {
        return db.execute(`
            SELECT * 
            FROM duelistas
        `);
    }

    // Devuelve un duelista específico por ID
    static fetchOne(id) {
        return db.execute(`
            SELECT * 
            FROM duelistas 
            WHERE id = ?
        `, [id]);
    }

    // Alias para fetchAll o fetchOne dependiendo si se pasa ID
    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

    // Busca duelistas por nombre (LIKE)
    static buscarPorNombre(valor) {
        return db.execute(`
            SELECT * 
            FROM duelistas 
            WHERE nombre LIKE ?
        `, ['%' + valor + '%']);
    }

};

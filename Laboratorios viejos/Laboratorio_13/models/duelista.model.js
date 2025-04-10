const db = require('../util/database');

module.exports = class duelistas {

    // Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_serie) {
        this.nombre = mi_nombre;
        this.serie = mi_serie; // Se añadió la serie a la propiedad
    }

    // Este método servirá para guardar de manera persistente el nuevo objeto
    save() {
        return db.execute('INSERT INTO personajes (nombre, serie) VALUES (?, ?)', [this.nombre, this.serie]);
    }

    // Este método servirá para devolver los objetos del almacenamiento persistente
    static fetchAll() {
        return db.execute('SELECT * FROM personajes');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM personajes WHERE id=?', [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

}

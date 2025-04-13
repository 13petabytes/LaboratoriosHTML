const db = require('../util/database');

module.exports = class Duelista {

    // Constructor de la clase. Sirve para crear un nuevo objeto y en él se definen las propiedades del modelo
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
    }

    // Método para guardar el nuevo objeto de manera persistente
    save() {
        return db.execute(
            'INSERT INTO duelistas(nombre, imagen) VALUES (?, ?)', 
            [this.nombre, this.imagen]
        );
    }

    // Método para devolver todos los objetos desde el almacenamiento persistente
    static fetchAll() {
        return db.execute('SELECT * FROM duelistas');
    }

    // Método para devolver un solo objeto basado en el id
    static fetchOne(id) {
        return db.execute('SELECT * FROM duelistas WHERE id=?', [id]);
    }

    // Método estático para decidir si devolver todos los duelistas o uno solo, dependiendo de si se pasa un id
    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }
};

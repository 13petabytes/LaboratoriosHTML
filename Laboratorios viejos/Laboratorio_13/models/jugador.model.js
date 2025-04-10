const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Jugador {

    constructor(mi_nombre, mi_contrasenia) {
        this.nombre = mi_nombre;
        this.contrasenia = mi_contrasenia;
    }

    save() {
        return bcrypt.hash(this.contrasenia, 12).then((contrasenia_cifrada) => {
            return db.execute(
                'INSERT INTO jugadores(nombre, contrasenia) VALUES (?, ?)', 
                [this.nombre, contrasenia_cifrada]
            );
        }).catch((error) => {
            console.log(error);
        });
    }

    static fetchAll() {
        return db.execute('SELECT * FROM jugadores');
    }

    static fetchOne(nombre) {
        return db.execute('SELECT * FROM jugadores WHERE nombre=?', [nombre]);
    }

    static fetch(nombre) {
        if (nombre) {
            return this.fetchOne(nombre);
        } else {
            return this.fetchAll();
        }
    }

}

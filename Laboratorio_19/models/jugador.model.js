const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Jugador {

    // Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_username, mi_password) {
        this.username = mi_username;
        this.password = mi_password;
    }

    // Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        return bcrypt.hash(this.password, 12).then((password_cifrado) => {
            return db.execute(
                'INSERT INTO jugadores(username, password) VALUES (?, ?)', 
                [this.username, password_cifrado]
            );
        }).catch((error) => {
            console.log(error);
        });
    }

    // Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM jugadores');
    }

    static fetchOne(username) {
        return db.execute('SELECT * FROM jugadores WHERE username=?', [username]);
    }

    static fetch(username) {
        if (username) {
            return this.fetchOne(username);
        } else {
            return this.fetchAll();
        }
    }

    static getPrivilegios(username) {
        return db.execute(
            `SELECT p.nombre 
            FROM privilegios p, rol_privilegio rp, roles r, 
                jugador_rol ur, jugadores j
            WHERE p.id=rp.privilegio_id AND rp.rol_id=r.id 
                AND r.id=ur.rol_id AND ur.jugador_id=j.id 
                AND j.username=?`, 
            [username]);
    }
}

const duelistas = [];

module.exports = class Duelista {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre) {
        this.nombre = mi_nombre;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        duelistas.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return duelistas;
    }

}

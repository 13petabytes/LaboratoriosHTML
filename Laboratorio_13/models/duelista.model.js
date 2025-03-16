const duelistas = [
    {nombre: 'Yugi Muto', url: 'https://yugioh.fandom.com/es/wiki/Yugi_Muto_(Duel_Links)'},
    {nombre: 'Seto Kaiba', url: 'https://yugioh.fandom.com/es/wiki/Seto_Kaiba_LOSD_(Duel_Links)'},
    {nombre: 'Joey Wheeler', url: 'https://yugioh.fandom.com/es/wiki/Joey_Wheeler_(Duel_Links)'},
    {nombre: 'Mai Valentine', url: 'https://yugioh.fandom.com/es/wiki/Mai_Valentine_(Duel_Links)'},
];

module.exports = class Duelista {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_url) {
        this.nombre = mi_nombre;
        this.url = mi_url;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        duelistas.push(this);
        return this
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return duelistas;
    }

}

// consola (log, info, warn, error, assert)
console.log("hola duelista!");
console.info("Aquí andamos aprendiendo");
console.warn("Esta es una advertencia");
console.error("askdjhgfasd");
console.assert(1 == 1);
console.assert(1 === 1); 
console.assert(1 == "1");
console.assert(1 === "1");
console.assert(1 == true);
console.assert(1 === true);


// variables, constantes
var duelista = "Seto Kaiba"; //forma antigua, no es tan segura

let mounsturo = "Blue eyes"; //forma moderna

console.log(mopunsturo);

const precio = 99.99;


// Alcance de las variables
for (let i = 0; i < 10; i++) {
    console.log(i);
}
//console.log(i);

// funciones modernas
const mi_funcion = () => {
    console.log("sk.djnverne.wjkn desde una función anónima")
}

mi_funcion();


// arreglos

const arreglo = ["Elemento"];

const arreglo2 = new Array(); 

arreglo.push("Otro elemento");

arreglo[10] = "Uno más";

//arreglos asociativos
arreglo["uno"] = 5;

//recorrido tradicional del arreglo
for (let i = 0; i < arreglo.length; i++) {
    console.log(arreglo[i]);
}

console.log("Operador in");

//recorridos alternativos del arreglo
for(let posicion in arreglo) {
    console.log(posicion);
}

for(let valor of arreglo) {
    console.log(valor);
}

//Objetos

const objeto = {};

objeto.atributo1 = "hola";

objeto.atributo2 = [];

objeto.atributo3 = {};

for(let posicion in objeto) {
    console.log(posicion);
}


// modificar html
const boton = document.getElementById("boton_imagen");
console.log(boton);

const poner_imagen_1 = () => {
    const span_imagen = document.getElementById("imagen_constantin_valdor");
    span_imagen.innerHTML = `<img alt="Primero de los 10k" 
            src="CLaboratorio 11/public/Constantin_Valdor.jpg>`;
    boton.onclick = poner_imagen_2;
};

const poner_imagen_2 = () => {
    const span_imagen = document.getElementById("imagen_kuribo_alado");
    span_imagen.innerHTML = `<img alt="Kuribo alado" 
            src="Laboratorio 11/public/kuriboalado.jpg"
        >`;
    boton.onclick = poner_imagen_3;
};

const poner_imagen_3 = () => {
    const span_imagen = document.getElementById("imagen_yugi_triste");
    span_imagen.innerHTML = `<img alt="Yugi triste" 
            src="Laboratorio 11/public/Yamiyugitriste.jpg"
        >`;
};

boton.onclick = poner_imagen_1;
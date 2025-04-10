function generarTabla() {
    let numero = prompt("Introduce un número:");
    numero = parseInt(numero);

    if (!isNaN(numero) && numero > 0) {
        let tablaHTML = "<table border='1'>";
        tablaHTML += "<tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";

        for (let i = 1; i <= numero; i++) {
            tablaHTML += `<tr><td>${i}</td><td>${i ** 2}</td><td>${i ** 3}</td></tr>`;
        }

        tablaHTML += "</table>";

        document.getElementById("resultado").innerHTML = tablaHTML; // Muestra la tabla
    } else {
        alert("Por favor, introduce un número válido.");
    }
}

function correctoIncorrecto() {
    let num1 = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    let num2 = Math.floor(Math.random() * 10) + 1;
    let resultadoCorrecto = num1 + num2;

    let inicioTiempo = Date.now(); // Registra el tiempo inicial

    let respuestaUsuario = prompt(`¿Cuánto es ${num1} + ${num2}?`);
    let finTiempo = Date.now(); // Registra el tiempo final

    let tiempoTomado = (finTiempo - inicioTiempo) / 1000; // Convierte a segundos

    let mensaje;
    if (parseInt(respuestaUsuario) === resultadoCorrecto) {
        mensaje = `<p>✅ ¡Correcto! Tardaste ${tiempoTomado.toFixed(2)} segundos.</p>`;
    } else {
        mensaje = `<p>❌ Incorrecto. La respuesta correcta era ${resultadoCorrecto}. Tardaste ${tiempoTomado.toFixed(2)} segundos.</p>`;
    }

    document.getElementById("resultado").innerHTML = mensaje;
}


function contador(arr) {
    let negativos = 0, ceros = 0, positivos = 0;

    for (let num of arr) {
        if (num < 0) {
            negativos++;
        } else if (num === 0) {
            ceros++;
        } else {
            positivos++;
        }
    }

    return { negativos, ceros, positivos };
}

function preContador() {
    let entrada = prompt("Introduce un arreglo de números separados por comas (ejemplo: -3, 0, 5, -1, 8, 0):");
    
    if (!entrada) {
        alert("Debes ingresar valores.");
        return;
    }

    // Convertimos la cadena de entrada en un arreglo de números
    let arreglo = entrada.split(",").map(num => parseInt(num.trim()));

    // Verificamos que todos los elementos sean números válidos
    if (arreglo.some(isNaN)) {
        alert("Por favor, introduce solo números válidos.");
        return;
    }

    let resultado = contador(arreglo);

    let mensaje = `
        <p>🔴 Números negativos: ${resultado.negativos}</p>
        <p>⚪ Ceros: ${resultado.ceros}</p>
        <p>🟢 Números positivos: ${resultado.positivos}</p>
    `;

    document.getElementById("resultado").innerHTML = mensaje;
}

function promedios(matriz) {
    let resultados = matriz.map(fila => {
        let suma = fila.reduce((acc, num) => acc + num, 0);
        return fila.length ? suma / fila.length : 0;
    });
    return resultados;
}


function prePromedio() {
    let entrada = prompt("Introduce una matriz en formato de filas separadas por ';' y números por ',' (Ej: 1,2,3;4,5,6;7,8,9):");

    if (!entrada) {
        alert("Debes ingresar una matriz válida.");
        return;
    }

    // Convertir la entrada en una matriz de números
    let matriz = entrada.split(";").map(fila => 
        fila.split(",").map(num => parseFloat(num.trim()))
    );

    // Verificar si la conversión fue correcta
    if (matriz.some(fila => fila.some(isNaN))) {
        alert("Por favor, introduce solo números válidos.");
        return;
    }

    let resultado = promedios(matriz);

    // Mostrar el resultado debajo del botón
    document.getElementById("resultado4").innerHTML = `
        <p> Promedios por fila: <strong>${resultado.join(", ")}</strong></p>
    `;
}

function invertir() {
    let entrada = prompt("Introduce un número:");

    if (entrada === null || entrada.trim() === "") {
        alert("Inserte un número válido");
        return;
    }

    let num = parseInt(entrada, 10); // Convertir a número
    if (isNaN(num)) {
        alert("Debe ingresar un número válido");
        return;
    }

    let ninvertido = 0;

    while (num !== 0) {
        let digito = num % 10;
        ninvertido = ninvertido * 10 + digito; // Corrección aquí
        num = Math.floor(num / 10);
    }

    document.getElementById("resultado5").innerHTML = `Número invertido: ${ninvertido}`;
}

const soporteThunder = {
    nombreTuner: "Lamia Reptilica",
    conseguir: "caja: Valhala Calling", // Se llenará con la elección del usuario
    
    veroportenombreyconseguir: function () {
        let mensaje = `
            <p>Nombre: ${soporteThunder.nombreTuner}</p>
            <p>Se consigue en: ${soporteThunder.conseguir}</p>
        `;
        document.getElementById("resultado7").innerHTML = mensaje;
    },

    modsoportenombre: function () {
        let nuevoNombre = prompt("Ingrese un nuevo nombre para el tuner:");
        if (nuevoNombre) {
            soporteThunder.nombreTuner = nuevoNombre; // Se guarda el nuevo nombre
        }
    },

    modconseguir: function () {
        let nuevaFuente = prompt("Ingrese la nueva forma de conseguir el tuner:");
        if (nuevaFuente) {
            soporteThunder.conseguir = nuevaFuente; // Se guarda el nuevo valor
        }
    },
};







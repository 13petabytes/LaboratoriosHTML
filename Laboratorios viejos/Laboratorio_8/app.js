//Funciones para que la paguina corra, no son parte del Laboratorio 8 son parte del 6
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene los elementos del DOM
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordStrength = document.getElementById("password-strength");
    const matchMessage = document.getElementById("match-message");
    
    // Obtiene los elementos de la lista de requisitos de seguridad
    const requirements = {
        length: document.getElementById("length"),
        uppercase: document.getElementById("uppercase"),
        lowercase: document.getElementById("lowercase"),
        number: document.getElementById("number"),
        special: document.getElementById("special")
    };

    // Escucha eventos de entrada en el campo de contraseña
    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        validatePassword(password); // Llama a la función que valida la seguridad de la contraseña
    });

    // Escucha eventos de entrada en el campo de confirmación de contraseña
    confirmPasswordInput.addEventListener("input", function () {
        checkMatch(); // Llama a la función que verifica si las contraseñas coinciden
    });

    // Función para validar la seguridad de la contraseña
    function validatePassword(password) {
        let valid = true;
        
        // Verifica si la contraseña cumple con cada uno de los requisitos
        requirements.length.classList.toggle("valid", password.length >= 8);
        requirements.uppercase.classList.toggle("valid", /[A-Z]/.test(password));
        requirements.lowercase.classList.toggle("valid", /[a-z]/.test(password));
        requirements.number.classList.toggle("valid", /\d/.test(password));
        requirements.special.classList.toggle("valid", /[!@#$%^&*]/.test(password));

        // Si todos los requisitos son válidos, se considera segura
        valid = Object.values(requirements).every(req => req.classList.contains("valid"));

        if (valid) {
            passwordStrength.innerHTML = "✔ Contraseña Segura";
            passwordStrength.style.color = "green";
        } else {
            passwordStrength.innerHTML = "❌ Contraseña Débil";
            passwordStrength.style.color = "red";
        }
    }

    // Función para verificar si las contraseñas coinciden
    function checkMatch() {
        if (passwordInput.value === confirmPasswordInput.value && passwordInput.value !== "") {
            matchMessage.innerHTML = "✔ Las contraseñas coinciden";
            matchMessage.style.color = "green";
        } else {
            matchMessage.innerHTML = "❌ Las contraseñas no coinciden";
            matchMessage.style.color = "red";
        }
    }
        // Nueva funcionalidad: Botón para mostrar texto
        
        const showTextButton = document.getElementById("showTextButton");
        const displayText = document.getElementById("displayText");
        
        showTextButton.addEventListener("click", function () {
            if (displayText.style.display === "none") {
                displayText.style.display = "block";
            } else {
                displayText.style.display = "none";
            }
        });
        
});

//Funciones relacionadas con el lab 8

function calcularPromedio(numeros) {
    if (numeros.length === 0) return 0; // Evita dividir por 0
    let suma = numeros.reduce((acum, num) => acum + num, 0);
    return suma / numeros.length;
}

//Arreglo pre echo
let numeros = [10, 20, 30, 40, 50];
console.log("El promedio es:", calcularPromedio(numeros));


const fs = require("fs"); // Importamos el módulo de archivos

function escribirArchivo(nombreArchivo, contenido) {
    fs.writeFileSync(nombreArchivo, contenido);
    console.log(`El archivo "${nombreArchivo}" ha sido creado.`);
}

// Probamos la función
escribirArchivo("mensaje.txt", "Hola, este es un mensaje guardado en un archivo.");

function invertirNumero(num) {
    // Convertimos el número a string, lo dividimos en caracteres, lo invertimos y lo volvemos a unir
    let numInvertido = parseInt(num.toString().split("").reverse().join(""));

    // Mantenemos el signo original si el número es negativo
    return num < 0 ? -numInvertido : numInvertido;
}

// Probamos la función con ejemplos
console.log(invertirNumero(12345));  // Salida: 54321
console.log(invertirNumero(-9876));  // Salida: -6789
console.log(invertirNumero(100));    // Salida: 1
console.log(invertirNumero(0));      // Salida: 0

const html = `<!DOCTYPE html>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laboratorio 6</title>
    <link rel="stylesheet" href="style.css">
</head>
<header>
    <h1><strong>Laboratorio 6</strong></h1>
</header>
<body>
    <div class="container">
        <h2>Validador de Contraseñas</h2>
        <form id="passwordForm">
            <label for="password">Contraseña:</label>
            <input type="password" id="password" required>
            <div id="password-strength"></div>

            <label for="confirmPassword">Confirmar Contraseña:</label>
            <input type="password" id="confirmPassword" required>
            <div id="match-message"></div>

            <ul id="password-requirements">
                <li id="length">✔ Mínimo 8 caracteres</li>
                <li id="uppercase">✔ Al menos una mayúscula</li>
                <li id="lowercase">✔ Al menos una minúscula</li>
                <li id="number">✔ Al menos un número</li>
                <li id="special">✔ Al menos un símbolo (!@#$%^&*)</li>
            </ul>

            <button type="submit">Validar</button>
        </form>
        
        <!-- Botón para mostrar texto -->
        <button id="showTextButton">Respuestas preguntas</button>
        <p id="displayText" style="display: none;">1. Es una buena práctica porque la validación en el lado del cliente con JavaScript mejora la experiencia del usuario al proporcionar retroalimentación inmediata sin necesidad de recargar la página. Esto ayuda a prevenir errores comunes, reducir el tráfico innecesario al servidor y optimizar el rendimiento de la aplicación.<br> 2. Las validaciones hechas con JavaScript pueden ser fácilmente evadidas si el usuario desactiva JavaScript en su navegador, manipula el código con herramientas de desarrollo del navegador o envía datos directamente al servidor mediante herramientas como Postman o cURL. <br> 3. Porque la validación en el cliente con JavaScript no reemplaza la validación en el servidor, sino que la complementa. Aunque un atacante pueda saltarse la validación en el cliente, esta sigue siendo útil para mejorar la experiencia del usuario y reducir la carga en el servidor. Sin embargo, siempre se debe validar nuevamente en el servidor para garantizar la seguridad de los datos.</p>
    </div>
    <script src="script.js"></script>
    
</body>
<footer>
    <p class="foot">Realizado por Fermín Nieto, A01707069</p>
</footer>

</html>`;

const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(html);
    response.end();
});

server.listen(3000);


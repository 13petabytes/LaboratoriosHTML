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


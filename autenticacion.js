// autenticacion.js
document.addEventListener("DOMContentLoaded", function() {
    const formularioLogin = document.querySelector(".formulario-login");
    
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "index.html"; // Redirigir al inicio
                } else {
                    alert("Credenciales incorrectas");
                }
            });
        });
    }

    const btnLogout = document.querySelector("#logout");
    
    if (btnLogout) {
        btnLogout.addEventListener("click", function() {
            fetch("/api/logout", {
                method: "POST"
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "login.html"; // Redirigir al inicio de sesión
                } else {
                    alert("Error al cerrar sesión");
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const formularioLogin = document.querySelector(".formulario-login");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            fetch("https://oa5xfm93p8.execute-api.us-west-2.amazonaws.com/prod/autenticacion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Inicio de sesión exitoso");
                    window.location.href = "index.html"; // Redirigir al inicio
                } else {
                    alert("Error en el inicio de sesión");
                }
            })
            .catch(error => {
                console.error('Error en el inicio de sesión:', error);
                alert("Error en el inicio de sesión");
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const formularioRegistro = document.querySelector(".formulario-registro");

    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            fetch("https://oa5xfm93p8.execute-api.us-west-2.amazonaws.com/prod/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Registro exitoso");
                    window.location.href = "login.html"; // Redirigir al inicio de sesión
                } else {
                    alert("Error en el registro");
                }
            })
            .catch(error => {
                console.error('Error en el registro:', error);
                alert("Error en el registro");
            });
        });
    }
});

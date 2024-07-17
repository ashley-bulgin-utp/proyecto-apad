// inicio.js
document.addEventListener("DOMContentLoaded", function() {
    // Cargar productos destacados o cualquier contenido relevante
    const productosDestacadosContainer = document.querySelector(".productos-destacados");

    if (productosDestacadosContainer) {
        fetch("/api/productos-destacados")
            .then(response => response.json())
            .then(productos => {
                let html = '';
                productos.forEach(producto => {
                    html += `
                        <div class="producto-destacado">
                            <h3>${producto.nombre}</h3>
                            <p>Precio: $${producto.precio}</p>
                            <a href="producto-detalle.html?id=${producto.id}">Ver Detalles</a>
                        </div>
                    `;
                });
                productosDestacadosContainer.innerHTML = html;
            });
    }
});

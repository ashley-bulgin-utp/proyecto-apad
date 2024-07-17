document.addEventListener('DOMContentLoaded', function () {
    const productos = [
        { id: 1, nombre: 'Lámpara de escritorio', descripcion: 'Lámpara LED con brazo ajustable.', precio: '25.00', imagen: 'https://example-bucket.s3.amazonaws.com/lampara_escritorio.jpg' },
        { id: 2, nombre: 'Silla ergonómica', descripcion: 'Silla de oficina con soporte lumbar.', precio: '85.00', imagen: 'https://example-bucket.s3.amazonaws.com/silla_ergonomica.jpg' },
        { id: 3, nombre: 'Escritorio ajustable', descripcion: 'Escritorio ajustable en altura para oficina.', precio: '150.00', imagen: 'https://example-bucket.s3.amazonaws.com/escritorio_ajustable.jpg' },
        { id: 4, nombre: 'Ratón inalámbrico', descripcion: 'Ratón ergonómico con conexión Bluetooth.', precio: '20.00', imagen: 'https://example-bucket.s3.amazonaws.com/raton_inalambrico.jpg' },
        { id: 5, nombre: 'Teclado mecánico', descripcion: 'Teclado mecánico con retroiluminación RGB.', precio: '70.00', imagen: 'https://example-bucket.s3.amazonaws.com/teclado_mecanico.jpg' },
        { id: 6, nombre: 'Monitor 4K', descripcion: 'Monitor de 27 pulgadas con resolución 4K.', precio: '300.00', imagen: 'https://example-bucket.s3.amazonaws.com/monitor_4k.jpg' },
        { id: 7, nombre: 'Auriculares con micrófono', descripcion: 'Auriculares con cancelación de ruido y micrófono.', precio: '50.00', imagen: 'https://example-bucket.s3.amazonaws.com/auriculares_microfono.jpg' },
        { id: 8, nombre: 'Impresora multifunción', descripcion: 'Impresora con funciones de escáner y fotocopiadora.', precio: '120.00', imagen: 'https://example-bucket.s3.amazonaws.com/impresora_multifuncion.jpg' },
        { id: 9, nombre: 'Cámara web HD', descripcion: 'Cámara web con resolución 1080p.', precio: '40.00', imagen: 'https://example-bucket.s3.amazonaws.com/camara_web_hd.jpg' }
    ];

    
    const userId = 'user123';

    async function obtenerCarrito() {
        try {
            const response = await fetch(`https://oa5xfm93p8.execute-api.us-west-2.amazonaws.com/prod/carrito-checkout/${userId}`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return [];
        }
    }

    async function actualizarCarrito(cartItems) {
        try {
            await fetch('https://oa5xfm93p8.execute-api.us-west-2.amazonaws.com/prod/carrito-checkout', {
                method: 'GET',
                body: JSON.stringify({ userId, cartItems }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
        }
    }

    async function agregarAlCarrito(producto) {
        const cartItems = await obtenerCarrito();
        const existingProduct = cartItems.find(p => p.id === producto.id);

        if (existingProduct) {
            existingProduct.cantidad += 1;
        } else {
            producto.cantidad = 1;
            cartItems.push(producto);
        }

        await actualizarCarrito(cartItems);
        alert('Producto añadido al carrito');
    }

    const productList = document.getElementById('product-list');

    productos.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.dataset.productId = producto.id;

        productItem.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="add-to-cart">Añadir al Carrito</button>
        `;

        productItem.querySelector('.add-to-cart').addEventListener('click', function () {
            agregarAlCarrito(producto);
        });

        productList.appendChild(productItem);
    });
});
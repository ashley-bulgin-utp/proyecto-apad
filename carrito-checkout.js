document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    let cart = [];

    // Configuración de AWS Amplify
    Amplify.configure({
        Auth: {
            region: 'us-west-2',
            userPoolId: 'us-west-2_MufhFk2bW',
            userPoolWebClientId: '3trovr36rnbt3soihc36t7iv52'
        },
        Storage: {
            AWSS3: {
                bucket: 'mi-tienda-bucket',
                region: 'us-west-2'
            }
        }
    });

    // Función para cargar el carrito desde AWS S3
    async function loadCart() {
        try {
            const data = await Storage.get('cart.json', { download: true });
            cart = JSON.parse(await data.Body.text());
        } catch (error) {
            console.error("Error al cargar el carrito: ", error);
        }
    }

    // Función para guardar el carrito en AWS S3
    async function saveCart() {
        try {
            await Storage.put('cart.json', JSON.stringify(cart), {
                contentType: 'application/json'
            });
        } catch (error) {
            console.error("Error al guardar el carrito: ", error);
        }
    }

    // Función para actualizar la interfaz de usuario del carrito
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(producto => {
            total += producto.precio * producto.cantidad;
            const item = document.createElement("div");
            item.classList.add("cart-item");
            item.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button class="remove-button" data-id="${producto.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(item);
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Función para eliminar un producto del carrito
    cartItemsContainer.addEventListener("click", async function(event) {
        if (event.target.classList.contains("remove-button")) {
            const productId = parseInt(event.target.getAttribute("data-id"));
            cart = cart.filter(producto => producto.id !== productId);
            await saveCart();
            updateCartUI();
        }
    });

    // Función para proceder con el pedido
    document.getElementById("checkout-button").addEventListener("click", async function() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const token = user.signInUserSession.idToken.jwtToken;

            const response = await fetch("https://oa5xfm93p8.execute-api.us-west-2.amazonaws.com/prod/carrito-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cart)
            });

            const data = await response.json();
            if (data.success) {
                alert("Pedido realizado con éxito");
                cart = [];
                await saveCart();
                updateCartUI();
            } else {
                alert("Error al realizar el pedido");
            }
        } catch (error) {
            console.error("Error al proceder con el pedido: ", error);
            alert("Error al realizar el pedido");
        }
    });

    loadCart().then(updateCartUI);
});

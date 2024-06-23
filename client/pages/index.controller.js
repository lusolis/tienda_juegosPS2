const modalContainer = document.getElementById("modal-container")

fetch('juegos2.json')
        .then(response => response.json())
        .then(productos => {
            const shopContent = document.getElementById('shopContent')
            shopContent.innerHTML = ''
            productos.forEach(product => {
            let content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombreJuego}">
                <h3>${product.nombreJuego}</h3>
                <p>${product.desc}</p>
                <p>Categoría: ${product.categoria}</p>
                <p class="price">Precio: USD <b>${product.precio}</b></p>
                <button class="agregarCarrito" data-id="${product.id}">Agregar al Carrito</button>
            `
            
            shopContent.append(content)
        })

        // Añadir event listeners a los botones de agregar al carrito
        document.querySelectorAll(".agregarCarrito").forEach(button => {
            button.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id")
                agregarAlCarrito(id)
                
            })
        })
    })
        .catch(error => console.error('Error al cargar el archivo JSON:', error))


const mostrarCarrito = () => {
    fetch("/carrito/all")
        .then((response) => response.json())
        .then((data) => {
            const carrito = data.carrito

            modalContainer.innerHTML = ""
            modalContainer.style.display = "flex"

            const modalHeader = document.createElement("div")
            modalHeader.className = "modal-header"
            modalHeader.innerHTML = `
                <h1 class="modal-header-title">Carrito.</h1>
            `
            modalContainer.append(modalHeader)

            const modalButton = document.createElement("h1")
            modalButton.innerText = "x"
            modalButton.className = "modal-header-button"

            modalButton.addEventListener("click", () => {
                modalContainer.style.display = "none"
            })

            modalHeader.append(modalButton)

            carrito.forEach((product) => {
                let carritoContent = document.createElement("div");
                carritoContent.className = "modal-content";
                carritoContent.innerHTML = `
                    <img src="${product.imagen}" alt="${product.nombreJuego}">
                    <h3>${product.nombreJuego}</h3>
                    <p>Categoría: ${product.categoria}</p>
                    <p>Cantidad: ${product.cantidad}</p>
                    <p class="price">Precio: USD <b>${product.cantidad * product.precio}</b></p>
                `
                modalContainer.append(carritoContent);

                let eliminar = document.createElement("span")
                eliminar.innerText = "❌"
                eliminar.className = "delete-product"
                carritoContent.append(eliminar)

                eliminar.addEventListener("click", () => {
                    eliminarProducto(product.id)                    
                    
                })
            })

            const total = carrito.reduce((acc, cur) => acc + cur.precio * cur.cantidad, 0);

            const totalCompra = document.createElement("div");
            totalCompra.className = "total-content";
            totalCompra.innerHTML = `Total a pagar: USD ${total}`;
            modalContainer.append(totalCompra)
        })
        .catch((error) => console.error("Error al obtener el carrito:", error));
};

const agregarAlCarrito = id => {
    fetch("/carrito/agregar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
        .then(response => response.json())
        .then(data => {
            alert("Producto agregado al carrito")
        })
        .catch(error => console.error("Error al agregar el producto:", error))
}

const eliminarProducto = (id) => {
    fetch(`/carrito/eliminar`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Producto eliminado:", data)
            mostrarCarrito() //actualiza el contenido de carrito
        })
        .catch((error) => console.error("Error al eliminar el producto:", error))
}

document.getElementById("verCarrito").addEventListener("click", mostrarCarrito)


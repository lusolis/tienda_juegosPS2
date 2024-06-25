import { mostrarCarrito } from "./home.controller.js"
import { modalContainer } from "./home.controller.js"


export const agregarAlCarrito = (id) => {
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
            let carrito = JSON.parse(sessionStorage.getItem("carrito")) || []
            const found = carrito.find(product => product.id === id)

            if (found) {
                found.cantidad++;
            } else {
                carrito.push({ id, cantidad: 1 })
            }
        })
        .catch(error => console.error("Error al agregar el producto:", error))
}

export const eliminarProducto = (id) => {
    fetch(`/carrito/eliminar`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Producto eliminado:", data);
            mostrarCarrito();
        })
        .catch((error) => console.error("Error al eliminar el producto:", error));
}


export const finalizarCompra = (user, productos, total) => {
    fetch(`/ordenes/crearOrden`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, productos, total }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud')
            }
            return response.json()
        })
        .then((data) => {
            if (data.error) {
                console.error("Error al crear la orden de compra:", data.error)
                mostrarCarrito()
            } else {
                console.log("Orden de compra creada:", data)
                console.log(sessionStorage.getItem("carrito")) 

            }
        })
        .catch((error) => console.error("Error al crear la orden de compra:", error))
}


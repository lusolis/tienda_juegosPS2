import { mostrarCarrito } from "./home.controller.js"
if(!sessionStorage.getItem('user')){

    console.log('Usuario no encontrado')
    /* window.location.href = "/index.html" */
}
const user = JSON.parse(sessionStorage.getItem('user'))


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
            console.log("Producto eliminado:", data)
            mostrarCarrito() 
        })
        .catch((error) => console.error("Error al eliminar el producto:", error))
}


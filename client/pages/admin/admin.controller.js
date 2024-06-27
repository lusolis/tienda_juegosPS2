import { API } from "/api.js"
const cambiarVistaBtn = document.getElementById("cambiarVistaBtn").addEventListener("click", () => {
    window.location.href = "/index.html"
})

const content = document.getElementById('Content')

fetch(`${API}/ordenes/verOrdenes`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud")
        }
        return response.json()
    })
    .then(ordenes => {
        if (!Array.isArray(ordenes)) {
            console.error("El servidor no devolvió un array válido:", ordenes)
            return
        }
        content.innerHTML = '';

        ordenes.forEach(orden => {
            const ordenElement = document.createElement("div");
            ordenElement.className = "card"
            ordenElement.innerHTML = `
                <h3>Orden de compra n°: ${orden._id}</h3>
                <h3>Usuario: ${orden.user}</h3>
                <h3>Productos</h3>
                <ul>
                    ${orden.productos.map(producto => `
                        <li>
                            <p>Nombre Juego: ${producto.nombreJuego}</p>
                            <p>Categoría: ${producto.categoria}</p>
                            <p>Cantidad: ${producto.cantidad}</p>
                            <p>Precio: USD ${producto.precio}</p>
                        </li>
                    `).join('')}
                </ul>
                <p><b>Total: USD ${orden.total}</p>               
            `
            content.appendChild(ordenElement)
        })
    })
    .catch(error => {
        console.error("Error al obtener las órdenes de compra:", error.message)
    })
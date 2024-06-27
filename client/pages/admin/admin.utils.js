import { API } from "/api.js";

export const eliminarOrden = (id) => {
    console.log('Eliminando orden con ID:', id);
    fetch(`/ordenes/eliminarOrden`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
    })
    .then((response) => {
        console.log('Respuesta de la API:', response);
        if (!response.ok) {
            throw new Error('Error en la solicitud')
        }
        return response.json()
    })
    .then((data) => {
        if (data.error) {
                
            console.error("Error al eliminando la orden de compra:", data.error)

        } else {
           
            console.log("Orden de compra eliminada:", data)

        }
    })
    .catch((error) => console.error("Error al eliminar la orden de compra:", error))
}
export const eliminarOrdenUI = (idOrden) => {
    const ordenElement = document.querySelector(`.card[data-id="${idOrden}"]`);
    if (ordenElement) {
        ordenElement.remove();
    }
}
import { API } from "../api.js"
const error = document.getElementById("error")

export const getJuegos = async (categoria) => {
  try {
      const res = await fetch(`${API}/juegos/categoria/${categoria}`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      })

      // Verificar si la respuesta fue exitosa
      if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`)
      }

      // Convertir la respuesta a JSON
      const data = await res.json()
      return data

  } catch (error) {
      console.error('Error al obtener los juegos:', error)
      throw error
  }
}

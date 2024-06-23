import { Router } from "express"
import { readFile } from "fs/promises"

const router = Router()
let carrito = []

const file = await readFile('./data/juegos.json', 'utf-8')
const juegosData = JSON.parse(file)



router.get('/all', (req, res) => {
  try {
    res.status(200).json({ carrito })    
  } catch (error) {
    console.error('Error al obtener el carrito:', error)
    res.status(400).json({ error: 'Ocurrió un error al obtener el carrito' })
  }
});

router.post('/agregar', (req, res) => {
  const { id } = req.body

  try { 
    const juego = juegosData.find(juego => juego.id == id)

    if (!juego) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const productoEnCarrito = carrito.find(item => item.id == id)

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1
      productoEnCarrito.precioTotal = productoEnCarrito.cantidad * juego.precio
    } else {
      carrito.push({
        id: juego.id,
        nombreJuego: juego.nombreJuego,
        imagen: juego.imagen,
        categoria: juego.categoria,
        cantidad: 1, 
        precio: juego.precio
      })
    }
    res.status(200).json({ carrito })

  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(400).json({ error: 'Ocurrió un error al agregar el producto al carrito' })
  }
})

router.delete('/eliminar', (req, res) => {
  const { id } = req.body

  try {
    const index = carrito.findIndex(item => item.id == id)

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    carrito.splice(index, 1)
    res.status(200).json({ carrito })
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error)
    res.status(400).json({ error: 'Ocurrió un error al eliminar el producto del carrito' })
  }
})

export default router
import { Router } from "express"
import { buscarCategoria } from "../utils/juegos.utils.js"
import { readFile }  from "fs/promises"

const router = Router()
const file = await readFile('./data/juegos.json', 'utf-8')
const juegosData = JSON.parse(file)

router.get('/all', (req, res) => {
  try {
    res.status(200).json(juegosData)
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener los datos' })
  }
});

router.get('/categoria/:category', (req, res) => {
  const category = req.params.category
  const resultado = buscarCategoria(category)
  try {
    if (resultado) {
      res.status(200).json(resultado)
    } 
  }  catch (error) {
    console.error(error.message)
    res.status(400).json({ error: 'Ocurrió un error al cargar los juegos' })
}
});

export default router
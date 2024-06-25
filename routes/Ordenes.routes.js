import { Router } from "express"
import { crearOrdenCompra, findAll } from "../db/model/ordenCompra.model.js"
const router = Router()

router.get('/verOrdenes', async (req,res) => {
    try {
        const ordenes = await findAll()
        res.status(200).json(ordenes)
    } catch (error) {
        console.error("Error al obtener las órdenes de compra:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
})

router.post('/crearOrden', async (req, res) => {
    try {
        const { user, productos, total } = req.body;

        const orden = await crearOrdenCompra({ user, productos, total });
        await orden.save();

        res.status(200).json(orden); // Enviar la orden creada en caso de éxito
    } catch (error) {
        console.error('Error al intentar crear la orden de compra:', error);
        res.status(500).json({ error: 'Error al intentar crear la orden de compra' });
    }
})


export default router
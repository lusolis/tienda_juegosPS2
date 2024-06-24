import { Router } from "express"
import { crearOrdenCompra } from "../db/model/ordenCompra.model.js"

const router = Router()

router.get('/verOrden', (req,res)=>{
    try{
        res.status(200).json()
    }catch(error){
        res.status(400).json()
    }
})

router.post('/create',async(req,res)=>{
    try {
        const { user, productos, total } = req.body
        
        if (!user || !productos || !total) {
            return res.status(400).json({ error: "Faltan datos obligatorios" })
        }

        const result = await crearOrdenCompra({ user, productos, total })

        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ error: "Error al crear la orden de compra" })
        }
    } catch (error) {
        console.error("Error al intentar crear la orden de compra:", error)
        res.status(400).json({ error: "Error al intentar crear la orden de compra" })
    }
})

export default router
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
    const {user, nombreJuego, categoria, cantidad, precio } = req.body

    try{
        const result = await crearOrdenCompra({user, nombreJuego, categoria, cantidad, precio})
        console.log(result)
        res.status(200).json(result)    
    }catch(error){
        res.status(400).json()
    }
})

export default router
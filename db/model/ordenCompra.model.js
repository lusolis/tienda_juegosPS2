import { connectToDataBase } from "../connection.js"
import Orden from "../schemas/ordenes.schema.js"

export const crearOrdenCompra =async ({user, productos, total})=>{
    try{
        await connectToDataBase()
       const nuevaOrden = await Orden.create({ user, productos, total })

       return nuevaOrden
    }catch(error){
        console.log(error)
        return false
    }
}
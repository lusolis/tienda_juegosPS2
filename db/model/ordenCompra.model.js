import { connectToDataBase } from "../connection.js";
import Orden from "../schemas/ordenes.schema.js";

export const crearOrdenCompra = async ({ user, productos, total }) => {
    try {
        await connectToDataBase()
        const nuevaOrden = await Orden.create({ user, productos, total })
        return nuevaOrden;
    } catch (error) {
        console.error("Error al crear la orden de compra:", error)
        return false;
    }
}


export const findAll = async () =>{
    try {
        await connectToDataBase()
        const res = await Orden.find()
        return res
        //return JSON.parse(JSON.stringify(res))
    } catch (error) {
        
    }
}
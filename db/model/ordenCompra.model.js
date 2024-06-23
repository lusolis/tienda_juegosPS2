import { connectToDataBase } from "../connection.js";
import Orden from "../schemas/ordenes.schema.js";

export const crearOrdenCompra =async ({user, nombreJuego, categoria, cantidad, precio, total })=>{
    try{
        await connectToDataBase();
        const res = await Orden.create({user, nombreJuego, categoria, cantidad, precio, total })
    
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
        return false
    }
}
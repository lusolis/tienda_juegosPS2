import express from "express";
import juegosRoutes from './routes/juegos.routes.js'
import ordenRoutes from './routes/Ordenes.routes.js'
import userRouter from './routes/user.routes.js' 
import carritoRouter from './routes/carrito.routes.js' 
import {readFile, writeFile} from 'fs/promises'

import 'dotenv/config'

const app = express()

const port  = process.env.PORT

app.use(express.json())

app.use(express.static('./client'))

app.listen(port,()=>{
    console.log(`Servidor levantado en puerto ${port}`)
}
)

app.use('/user', userRouter)
app.use('/juegos', juegosRoutes)
app.use('/ordenes', ordenRoutes)
app.use('/carrito', carritoRouter)
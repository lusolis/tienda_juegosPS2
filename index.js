import express from "express"
import cors from 'cors'
import juegosRoutes from './routes/juegos.routes.js'
import ordenRoutes from './routes/Ordenes.routes.js'
import userRouter from './routes/user.routes.js' 
import carritoRouter from './routes/carrito.routes.js' 
import path from 'path'
import { fileURLToPath } from 'url'
import {readFile, writeFile} from 'fs/promises'

import 'dotenv/config'

const app = express()

const port  = process.env.PORT

app.use(cors())
app.use(express.json())

const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, 'client')))
app.use('/img', express.static(path.resolve(__dirname, 'img')))

app.listen(port,()=>{
    console.log(`Servidor levantado en puerto ${port}`)
}
)

app.use('/user', userRouter)
app.use('/juegos', juegosRoutes)
app.use('/ordenes', ordenRoutes)
app.use('/carrito', carritoRouter)
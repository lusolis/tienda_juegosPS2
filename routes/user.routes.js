import { Router } from "express";
import { readFile, writeFile } from 'fs/promises' 

const router = Router()
const fileUsers = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(fileUsers)

router.post('/login', (req, res)=>{
    const userName = req.body.userName
    const pass = req.body.pass

    const result = userData.find(e => e.username === userName && e.pass === pass)
    
    if(result){
        const data = {
            name: result.name,
            lastName: result.lastname,
            userName: result.username,
            status: true
        }
        console.log(data)
        res.status(200).json(data)
    }else{
        res.status(400).json({status:false})
    }
})

router.post('/register', (req, res) => {
    
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const username = req.body.username
    const pass = req.body.pass

    if (!nombre || !apellido || !username || !pass) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }

    const existingUser = userData.find(user => user.username.toLowerCase() === username.toLowerCase())
    if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya está registrado' })
    }

    const nuevoId = userData[userData.length -1].id + 1
    const nuevoUsuario = {        
        nombre,
        apellido,
        username,
        pass,
        id: nuevoId,
        status:true
    }
    console.log(nuevoUsuario)
    userData.push(nuevoUsuario)
    try{
        writeFile('./data/users.json', JSON.stringify(userData,null,2));
        res.status(200).json(nuevoUsuario)
    }catch(error){
        res.sendStatus(400)
    }
})

export default router
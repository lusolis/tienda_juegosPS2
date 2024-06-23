import {readFile} from 'fs/promises'

const FileData = await readFile('./data/juegos.json', 'utf-8')
const juegos = JSON.parse(FileData)

export const buscarCategoria=(categoria)=>{
    const cate = juegos.filter(a => a.categoria.toLowerCase() === categoria.toLowerCase())
    if (cate) {
        return { cate }
    } else{
        console.log('no se encontro la categoria')
    }
}
import {readFile} from 'fs/promises'

const FileData = await readFile('./data/juegos.json', 'utf-8')
const juegos = JSON.parse(FileData)

export const buscarCategoria = (categoria) => {
    const cate = juegos.filter(juego => juego.categoria.toLowerCase() === categoria.toLowerCase())
    if (cate.length > 0) {
        return cate;
    } else {
        console.log('No se encontraron juegos en la categoría:', categoria)
        return []
    }
}
import mongoose from 'mongoose';

const {Schema, models, model} = mongoose;

const ordenSchema = new Schema({
    user: {type: String, required: true, unique: true},
    nombreJuego: {type: String, required:true },
    categoria: {type: String, required: true},
    cantidad: {type: Number, default: 1},
    precio: {type: Number, required: true},
    total: {type: Number, default: 0}
})

const Orden = models.orden || model('model', ordenSchema)

export default Orden



import mongoose from 'mongoose'

export const connectToDataBase = async () => {
    try {
      const mongoURI = 'mongodb://localhost:27017/mongodb1';
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log('MongoDB conectado')
    } catch (error) {
      console.error('Error al conectar con MongoDB:', error)
      throw error
    }
  };
  
// export default connectToDataBase
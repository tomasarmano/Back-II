import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user.routes.js';

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const loggerMidleware = (req,res,next) =>{
    console.log(`${new Date().toString()} - ${req.method} ${req.url}`);
    next()
}

app.use(loggerMidleware)
    
mongoose.connect('mongodb+srv://tomasarmano:mcyc7h3VAzt2ral9@back.o8xfj.mongodb.net/?retryWrites=true&w=majority&appName=Back')
    .then(()=>console.log('MongoDB conectado'))
    .catch((err)=>console.log(err))

app.use('/api/users',router)

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})
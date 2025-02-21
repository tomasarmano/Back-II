import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import {__dirname} from './dirname.js';
import { connect } from 'mongoose';
import path  from 'path';
import {viewsRouter} from './routes/views.routes.js'
import {sessionRouter} from './routes/session.routes.js'

const app = express()
const PORT = 5000
const SECRET = 'secretKey'

const mongoUser='tomasarmano'
const mongoPasswword='mcyc7h3VAzt2ral9'
const mongoUrl=`mongodb+srv://${mongoUser}:${mongoPasswword}@back.o8xfj.mongodb.net/?retryWrites=true&w=majority&appName=Back`


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(session({
    secret:SECRET,
    store: MongoStore.create({
      mongoUrl,
      ttl: 5,
    }),
    resave:false,
    saveUninitialized:false
}))
  
connect(mongoUrl)
.then(()=>console.log('Concetado a mongoDB'))
.catch((err)=>console.log(err))

app.engine(
    "hbs",
    handlebars.engine({
        extname:".hbs",
        defaultLayout:"main"
    })
)
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})
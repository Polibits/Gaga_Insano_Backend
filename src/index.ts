import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'
import conn from './db/conn';

const port = 3003

const app = express();

// Express Config
//app.use(express.json())  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    

app.use('/user' , userRoutes)

/* Conexão Sync */ 
const force = false;
conn.sync({ force: force})// colocar force: true ao alterar dados no BD
.then( ()=> {
    console.log('server rodando na porta: ', port)
    app.listen(port)
})
.catch((err :any)=> {console.log(err)})

//.sync({ force: true}
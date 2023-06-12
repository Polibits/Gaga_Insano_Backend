import express from 'express';

import userRoutes from './routes/userRoutes'
import conn from './db/conn';

const port = 3003

const app = express();

app.use('/' , userRoutes)

/* Conexão Sync */ 
const force = false;
conn.sync({ force: force})// colocar force: true ao alterar dados no BD
.then( ()=> {
    console.log('server rodando na porta: ', port)
    app.listen(port)
})
.catch((err)=> {console.log(err)})

//.sync({ force: true}
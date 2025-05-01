import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import cookie from 'cookie-parser'
import routes from './routes/user.routes.js';

import db from './db/db.js'
db()



const app = express();

app.use(cors()); // Use Domain here!!
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie())

app.use('/users', routes);

app.get('/', (req,res)=>{
    res.send("Hello!");
})


export default app;
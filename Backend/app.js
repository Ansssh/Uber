import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors()); // Use Domain here!!


app.get('/', (req,res)=>{
    res.send("Hello!");
})


export default app;
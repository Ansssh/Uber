import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import cookie from 'cookie-parser'
import routes from './routes/user.routes.js';
import CapRoutes from './routes/captain.routes.js';
import mapRoutes from './routes/map.routes.js';
import Rides from './routes/ride.routes.js';
import axios from 'axios';

import db from './db/db.js'
db()



const app = express();

app.use(cors({
  origin: 'https://uber-swart-one.vercel.app'
})); // Use Domain here!!
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie())

app.use('/users', routes);
app.use('/captain', CapRoutes);
app.use('/map', mapRoutes);
app.use('/rides', Rides);

app.get('/', (req,res)=>{

    res.send("Hello!");
})

// Route to get coordinates from address using Nominatim (OpenStreetMap));


export default app;
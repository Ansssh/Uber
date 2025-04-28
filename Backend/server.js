import http from 'http';
import app from './app.js';


const port = process.env.PORT || 3000;
const srvr = http.createServer(app);

srvr.listen(port, ()=>{
    console.log(`Server runs on port - ${port}`);
})
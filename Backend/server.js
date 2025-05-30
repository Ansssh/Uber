import http from 'http';
import app from './app.js';
import { initSocket } from './socket.js';


const port = process.env.PORT || 3000;
const srvr = http.createServer(app);

const io = initSocket(srvr);

srvr.listen(port, ()=>{
    console.log(`Server runs on port - ${port}`);
})
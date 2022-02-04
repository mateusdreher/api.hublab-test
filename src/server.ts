import { app } from './app';
import { Server } from "socket.io";
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { socketConnect } from './socket';
dotenv.config();

const PORT = process.env.API_PORT || 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {});

try {
    socketConnect(io);

    httpServer.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
}
catch(error) {
    console.error(error);
}
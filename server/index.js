import { createServer } from 'http';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import SocketIO from 'socket.io';

import initialise from './statup';
import * as socketsHandlers from './sockets';
import compression from 'compression';
import cors from 'cors';

async function start() {
    await initialise();

    //Make the express handler
    const app = express();
    app.use(compression({
        level: 9,
    }))
    app.use(cors());
    //Create a server with the express handler attached
    const server = createServer(app);
    
    //Create the socket service
    const io = SocketIO(server);
    
    
    io.on('connection', socket => {
        socket.on('identity', (data) => socketsHandlers.identity(data, socket, io));
        socket.on('admin', (data) => socketsHandlers.admin(data, socket, io));
        socket.on('answer', (data) => socketsHandlers.answer(data, socket, io));
        socket.on('set-question', (data) => socketsHandlers.setQuestion(data, socket, io));
        socket.on('buzz', (data) => socketsHandlers.buzz(data, socket, io));
        socket.on('mark-finished', (data) => socketsHandlers.complete(data, socket, io));
        socket.on('pause', (data) => socketsHandlers.pause(data, socket, io));
        socket.on('bank', (data) => socketsHandlers.bank(data, socket, io));
    });
    
    //Setup static asset delivery using gzip services
    app.use(expressStaticGzip('static'));
    
    const index = (_, res) => res.sendFile('static/index.html', {root : '.'});
    app.get('*', index);
    
    
    server.listen(3000);

}

start();
'use strict';

import { ChildProcess } from 'child_process';
import {app, playRoutes} from './app.js';

import { createServer} from 'http'
import { Server, Socket } from 'socket.io';
import GameManager from './sockets/GameManager.js';
import parser from 'socket.io-msgpack-parser'
import RoomManager from './sockets/RoomManager.js';
import { Engine } from './engine/src/core/engine.js';
import {WebSocketServer} from 'ws'

const serv = createServer(app);

const io: Server = new Server(serv, {
  parser: parser,
  perMessageDeflate: false
})


let roomManager: RoomManager = new RoomManager(io)
playRoutes.setRooms(roomManager)
/* LOCAL CONFIG */
const BASE_URL = "localhost";
const PORT = 5000;


/**
 * Starts the server on the provided port
 */
const server = serv.listen(
  PORT,
  () => {
    console.log(
      'App is running on %s:%d in dev mode',
      BASE_URL,
      PORT,
      '\nPress CTRL-C to stop',
    );
    
  },
);


export default server;

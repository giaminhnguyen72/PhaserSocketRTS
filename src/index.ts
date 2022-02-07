'use strict';

import { http } from 'winston';
import {app, playRoutes} from './app';
import winston from './utils/logger/winston';
import { createServer} from 'http'
import { Server, Socket } from 'socket.io';
import GameManager from './sockets/GameManager';

const serv = createServer(app);

const io = new Server(serv)


let gameManager:GameManager = new GameManager(io, playRoutes)


/* LOCAL CONFIG */
const BASE_URL = "localhost";
const PORT = app.get('port');
const ENV = app.get('env');

/**
 * Starts the server on the provided port
 */
const server = serv.listen(
  PORT,
  () => {
    console.log(
      'App is running on %s:%d in %s mode',
      BASE_URL,
      PORT,
      ENV,
      '\nPress CTRL-C to stop',
    );
    winston.debug(`App is running on ${BASE_URL}:${PORT} in ${ENV} mode`);
  },
);

export default server;

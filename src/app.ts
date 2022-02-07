'use strict';

/* all imports */
import * as path from 'path'
import * as express from 'express';

import * as morgan from './utils/logger/morgan';
import * as helmet from 'helmet';
import cors from './middlewares/cors';
import mongo from './utils/mongo';
import genericErrorHandler from './middlewares/genericErrorHandler';
import notFoundErrorHandler from './middlewares/notFoundErrorHandler';
import {Response, Request} from 'express'
import RedirectRouter from './routes/redirect';
import Route from './routes/route';
import PlayRouter from './routes/playRouter';


require('dotenv').config();

/* instanciate app */
const app = express();

/* set options */
app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'dev');

/* set loggers */
if (app.get('env') !== 'test') {
  app.use(morgan.errorLogging);
  app.use(morgan.successLogging);
}

/* initialise MongoDB connection */
//mongo.init();

/* initialize middlewares */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors);
/* initialise API routes */
app.use(express.static(path.resolve(__dirname, 'frontend')))

let routes: Route = new RedirectRouter()


app.use('/', routes.getRouter());

let playRoutes: PlayRouter = new PlayRouter();
app.use("/play", playRoutes.getRouter());
/* error middlewares */
app.use(genericErrorHandler);
app.use(notFoundErrorHandler); // must be the last one !

export{ app, playRoutes };

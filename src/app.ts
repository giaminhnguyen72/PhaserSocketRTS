'use strict';

/* all imports */
import * as path from 'path'
import express, { Express } from 'express'


import helmet from 'helmet';
import cors from './middlewares/cors.js';
import cookieParser from 'cookie-parser'

import RedirectRouter from './routes/redirect.js';
import Route from './routes/route.js';
import PlayRouter from './routes/playRouter.js';
import * as dotenv from 'dotenv'
import {fileURLToPath} from 'url'



/* instanciate app */
let app: Express = express();

/* set options */
app.set('port', 3000);
app.set('env', 'dev');
dotenv.config({path: path.resolve(path.resolve(), './.env')})
/* set loggers */

/* initialise MongoDB connection */
//mongo.init();
let connectSrc;
if (process.env.IP) {
    connectSrc = ["ws://localhost:8080/", "'self'", process.env.IP]
} else {
    connectSrc =["ws://localhost:8080/", "'self'"]
}
/* initialize middlewares */

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
    contentSecurityPolicy: {
        "directives": {
            "script-src": ["'self'"],
            "default-src": ["ws:*"],
            "connect-src": connectSrc,
	    upgradeInsecureRequests:null 
        }
    }
}));
app.use(cors);
/* initialise API routes */
const __dirname = path.resolve()
app.use(express.static(path.resolve(__dirname, 'dist/frontend')))
app.use(express.static(path.resolve(__dirname,   'public')))
let routes: Route = new RedirectRouter()


app.use('/', routes.getRouter());

let playRoutes: PlayRouter = new PlayRouter();
app.use("/play", playRoutes.getRouter());
app.use("/play/:id", express.static(path.join(__dirname, 'public')))
export{ app, playRoutes };

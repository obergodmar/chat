import cors from 'cors';
import debug from 'debug';
import dotenv from 'dotenv';
import express from 'express';
import * as expressWinston from 'express-winston';
import * as http from 'http';
import * as winston from 'winston';

import { CommonRoutesConfig } from './common/common.routes.config';
import { MessagesRoutes } from './messages/messages.routes.config';
import { SessionRoutes } from './session/session.routes.config';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.SERVER_PORT;

const routes: CommonRoutesConfig[] = [];

const debugLog = debug('app');

app.use(express.json());

app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new SessionRoutes(app), new MessagesRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

// start the express server
app.get('/', (req, res) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});

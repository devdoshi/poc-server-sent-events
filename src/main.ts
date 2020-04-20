import express from 'express';
import {routerFactory as eventsRouterFactory} from './events-router';
import {routerFactory as pokesRouterFactory} from './pokes-router';
import {EventEmitter} from 'events';
import path from 'path';


async function main(port: number) {
  const app = express();
  const eventEmitter = new EventEmitter();
  const eventsRouter = eventsRouterFactory(eventEmitter);
  const pokesRouter = pokesRouterFactory(eventEmitter);
  app.use('/', express.static(path.join(__dirname, '../static')));
  app.use('/events', eventsRouter);
  app.use('/pokes', pokesRouter);
  app.listen(port, () => {
    console.log('server started');
  });
}

const [, , portString] = process.argv;
const port = parseInt(portString, 10);
main(port);

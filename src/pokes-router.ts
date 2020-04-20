import {Router} from 'express';
import express from 'express';
import {EventEmitter} from 'events';

function routerFactory(eventEmitter: EventEmitter) {

  const router: Router = express.Router();
  router.post('/', async function (req, res) {
    eventEmitter.emit('poke');
    res.status(204).end();
  });
  return router;
}

export {
  routerFactory
};

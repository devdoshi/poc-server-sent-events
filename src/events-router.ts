import {Router} from 'express';
import express from 'express';
import {EventEmitter} from 'events';

type ChannelId = string

interface ChannelState {
  id: ChannelId,
  counter: number
}

function routerFactory(eventEmitter: EventEmitter) {

  const router: Router = express.Router();
  const channelState: Map<ChannelId, ChannelState> = new Map();
  let nextChannelId = 0;
  router.post('/', async function (req, res) {
    const id = nextChannelId.toString();
    nextChannelId += 1;

    channelState.set(id, {
      id,
      counter: 0
    });
    res.json({
      url: `${req.baseUrl}/channels/${id}`
    });
  });
  router.get('/channels/:channelId', async function (req, res) {
    const {channelId} = req.params;
    const state = channelState.get(channelId);
    if (!state) {
      return res.sendStatus(404);
    }
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };

    function emit(data: any) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    res.writeHead(200, headers);
    emit({type: 'message', data: {text: 'connected'}});

    eventEmitter.on('poke', function () {
      emit({type: 'message', data: {text: `hello ${state.counter}`}});
      state.counter += 1;
    });

    req.on('close', function () {
      channelState.delete(channelId);
      console.log('disconnected');
    });
  });

  return router;
}

export {
  routerFactory
};

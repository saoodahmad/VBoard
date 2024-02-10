import { createServer } from 'http';
import express from 'express';
import next, { NextApiHandler } from 'next';
import { Server } from 'socket.io';

import * as _ from '../common/types/global';

const serverPort = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV !== 'production';

const nxtApp = next({ dev: isDev });

const handler: NextApiHandler = nxtApp.getRequestHandler();

nxtApp.prepare().then(async () => {
  const app = express();

  const server = createServer(app);

  const io = new Server<Client2ServerEvents, Server2ClientEvents>(server);

  app.get('/health', (_, res) => {
    res.status(200).send('Healthy');
  });

  io.on('connection', (socket) => {
    console.log('connection successful');

    socket.on('server_draw', (moves, options) => {
      console.log('drawing');
      socket.broadcast.emit('client_draw', moves, options);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });

  app.all('*', (req: any, res: any) => {
    handler(req, res);
  });

  server.listen(serverPort, () => {
    console.log(`Server is listening on ${serverPort}`);
  });
});

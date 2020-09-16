import express from 'express';
import cors from 'cors';
import 'dotenv';
import BullBoard from 'bull-board';
import { resolve } from 'path';

import Mail from './lib/Queue';

import { routes } from './routes';

class AppController {
  server = express();

  constructor() {
    this.server = express();
    BullBoard.setQueues(Mail.queues.map(queue => queue.bull));

    this.middlwares();
    this.routes()
  }

  middlwares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files', 
      express.static(
        resolve(__dirname, '..', 'temp', 'uploads')
      ));
    this.server.use('/admin/queues', BullBoard.UI);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new AppController().server;
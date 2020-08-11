import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { routes } from './routes';

class AppController {
  server = express();

  constructor() {
    this.server = express();

    this.middlwares();
    this.routes()
  }

  middlwares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new AppController().server;
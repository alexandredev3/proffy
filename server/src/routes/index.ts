import { Router } from 'express';

import ClassesController from '../app/controllers/ClassesController';
import ConnectionsController from '../app/controllers/ConnectionsController';
import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';

import authMiddleware from '../app/middlewares/auth';

const routes = Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const userController = new UserController();
const sessionController = new SessionController();

routes.post('/users', userController.store);
routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.put('/users', userController.update);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export { routes }
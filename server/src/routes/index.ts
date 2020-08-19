import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

import ClassesController from '../app/controllers/ClassesController';
import ConnectionsController from '../app/controllers/ConnectionsController';
import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
import ScheduleController from '../app/controllers/ScheduleController';
import FileController from '../app/controllers/FileController';
import ResetPasswordController from '../app/controllers/ResetPasswordController';

import authMiddleware from '../app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const userController = new UserController();
const sessionController = new SessionController();
const scheduleController = new ScheduleController();
const fileController = new FileController();
const resetPasswordController = new ResetPasswordController();

routes.post('/users', userController.store);
routes.put('/users', userController.update);

routes.post('/session', sessionController.store);

routes.post('/forgot_password', resetPasswordController.create);
routes.put('/reset_password/:token', resetPasswordController.update);

routes.use(authMiddleware);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);
routes.put('/classes/:id', classesController.update);
routes.delete('/classes/:id', classesController.delete);

routes.post('/classes/schedule', scheduleController.create);
routes.put('/classes/schedule/:id', scheduleController.update);

routes.post('/files', upload.single('image'), fileController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export { routes }
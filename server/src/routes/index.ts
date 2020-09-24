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
import TeachersCountController from '../app/controllers/TeachersCountController';
import ClassesListController from '../app/controllers/ClasssesListController';

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
const teachersCountController = new TeachersCountController();
const classesListController = new ClassesListController();

routes.post('/users', userController.store);

routes.post('/session', sessionController.store);

routes.post('/forgot_password', resetPasswordController.create);
routes.put('/reset_password/:token', resetPasswordController.update);

routes.use(authMiddleware);

routes.get('/class', classesListController.index);

routes.get('/classes', classesController.show);
routes.post('/classes', classesController.create);
routes.put('/classes', classesController.update);
routes.delete('/classes/:id', classesController.delete);

routes.get('/classes/schedule', scheduleController.index);
routes.post('/classes/schedule', scheduleController.create);
routes.put('/classes/schedule/:id', scheduleController.update);
routes.delete('/classes/schedule/:id', scheduleController.delete);

routes.post('/files', upload.single('image'), fileController.create);
routes.get('/files/:id', fileController.index);

routes.get('/teachers', teachersCountController.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export { routes }
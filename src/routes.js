import { Router } from 'express';

import ActivitiesController from './app/controllers/ActivitiesController';
import UsersController from './app/controllers/UsersController';

const routes = new Router();

routes.get('/activities/:username', ActivitiesController.userActivities);
routes.get('/activities', ActivitiesController.index);
routes.post('/activities', ActivitiesController.store);

routes.get('/users/:username', UsersController.show);
routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);
routes.put('/users/:username', UsersController.update);
routes.delete('/users/:username', UsersController.delete);

export default routes;

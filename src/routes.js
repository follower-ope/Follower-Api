import { Router } from 'express';

import ActivitiesController from './app/controllers/ActivitiesController';
import ProjectsController from './app/controllers/ProjectController';
import UsersController from './app/controllers/UsersController';
import UsersActivitiesController from './app/controllers/UsersActivitiesController';

const routes = new Router();

routes.get('/activities/:username', ActivitiesController.userActivities);
routes.get('/activities', ActivitiesController.index);
routes.post('/activities', ActivitiesController.store);

routes.get('/projects', ProjectsController.index);
routes.get('/projects/:id', ProjectsController.show);
routes.post('/projects', ProjectsController.store);
routes.put('/projects/:id', ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.delete);

routes.get('/users/:username', UsersController.show);
routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);
routes.put('/users/:username', UsersController.update);
routes.delete('/users/:username', UsersController.delete);

routes.get('/usersActivities', UsersActivitiesController.index);

export default routes;

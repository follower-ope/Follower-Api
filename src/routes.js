import { Router } from 'express';

import ActivitiesController from './app/controllers/ActivitiesController';
import ProjectsController from './app/controllers/ProjectController';

const routes = new Router();

routes.get('/activities/:username', ActivitiesController.userActivities);
routes.get('/activities', ActivitiesController.index);
routes.post('/activities', ActivitiesController.store);

routes.get('/projects', ProjectsController.index);
routes.get('/projects/:id', ProjectsController.show);
routes.post('/projects', ProjectsController.store);
routes.put('/projects/:id', ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.delete);

export default routes;

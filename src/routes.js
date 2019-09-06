import { Router } from 'express';

import ActivitiesController from './app/controllers/ActivitiesController';

const routes = new Router();

routes.get('/activities/:username', ActivitiesController.userActivities);
routes.get('/activities', ActivitiesController.index);
routes.post('/activities', ActivitiesController.store);

export default routes;

import { Router } from 'express';

import ActivitiesController from './app/controllers/ActivitiesController';

const routes = new Router();

routes.get('/activities/:id', ActivitiesController.index);
routes.post('/activities', ActivitiesController.store);

export default routes;

import { Router } from 'express';

import ActivitiesController from './app/controllers/ActivitiesController';

const routes = new Router();

routes.post('/activities', ActivitiesController.store);

export default routes;

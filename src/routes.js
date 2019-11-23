import { Router } from 'express';

import ActivitiesController from './app/controllers/ActivitiesController';
import ProjectsController from './app/controllers/ProjectController';
import UsersController from './app/controllers/UsersController';
import UsersActivitiesController from './app/controllers/UsersActivitiesController';
import SoftwaresController from './app/controllers/SoftwaresController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';
import ProfilesController from './app/controllers/ProfilesController';
import ProfilesSoftwaresController from './app/controllers/ProfilesSoftwaresController';

const routes = new Router();

routes.post('/session', AuthController.store);

routes.post('/activities', ActivitiesController.store);

routes.post('/users', UsersController.store);

routes.use(authMiddleware);

routes.get('/activities', ActivitiesController.index);
routes.get('/activities/:username', ActivitiesController.show);
routes.put('/activities/:username', ActivitiesController.updateProjectByRange);

routes.get('/projects', ProjectsController.index);
routes.get('/projects/:id', ProjectsController.show);
routes.post('/projects', ProjectsController.store);
routes.put('/projects/:id', ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.delete);

routes.get('/users/:username', UsersController.show);
routes.get('/users', UsersController.index);
routes.get('/usersIncomplete', UsersController.indexIncomplete);
routes.put('/users/:username', UsersController.update);
routes.delete('/users/:username', UsersController.delete);

routes.get('/softwares', SoftwaresController.index);

routes.get('/usersActivities', UsersActivitiesController.index);

routes.get('/profile/:id', ProfilesController.show);
routes.get('/profile', ProfilesController.index);
routes.post('/profile', ProfilesController.store);
routes.put('/profile/:id', ProfilesController.update);
routes.delete('/profile/:id', ProfilesController.delete);

routes.post('/profilesSoftwares', ProfilesSoftwaresController.store)
routes.get('/profilesSoftwares', ProfilesSoftwaresController.index)
routes.get('/profilesSoftwares/:profileId', ProfilesSoftwaresController.indexProfile)
routes.put('/profilesSoftwares/:id', ProfilesSoftwaresController.update);
routes.delete('/profilesSoftwares/:id', ProfilesSoftwaresController.delete);
//routes.get('/profilesSoftwares/:softwareProfileId', ProfilesSoftwaresController.show)

export default routes;

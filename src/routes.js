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
import UserProductivityController from './app/controllers/UsersProductivityController';
import ProjectProductivityController from './app/controllers/ProjectProductivityController';
import ProjectProfilesProductivityController from './app/controllers/ProjectProfilesProductivityController';

const routes = new Router();

routes.post('/session', AuthController.store);

routes.post('/activities', ActivitiesController.store);

routes.post('/users', UsersController.store);

routes.use(authMiddleware);

routes.post('/profile', ProfilesController.store);

routes.get('/activities/:username/projectless', ActivitiesController.listProjectlessActivities);
routes.get('/activities', ActivitiesController.index);
routes.get('/activities/:username', ActivitiesController.show);
routes.put('/activities/:id', ActivitiesController.update);
routes.put('/activities/:username', ActivitiesController.updateProjectByRange);

routes.get('/projects/:id/users', ProjectsController.indexUsers);

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
routes.get('/softwares/:id/profiles', SoftwaresController.indexProfileBySoftware);

routes.post('/usersActivities', UsersActivitiesController.index);

routes.get('/profile/:id', ProfilesController.show);
routes.get('/profile', ProfilesController.index);
routes.put('/profile/:id', ProfilesController.update);
routes.delete('/profile/:id', ProfilesController.delete);

routes.post('/profilesSoftwares', ProfilesSoftwaresController.store);
routes.get('/profilesSoftwares', ProfilesSoftwaresController.index);
routes.put('/profilesSoftwares/:id', ProfilesSoftwaresController.update);
routes.delete('/profilesSoftwares/:id', ProfilesSoftwaresController.delete);
routes.get('/profilesSoftwares/:profileId', ProfilesSoftwaresController.indexProfile);

routes.post('/userProductivity', UserProductivityController.index);

routes.get('/projectProductivity/:id', ProjectProductivityController.show);

routes.get('/projectProductivity', ProjectProductivityController.index)

routes.get('/projectProfileProductivity/:id', ProjectProfilesProductivityController.show);

routes.post('/projectProductivityByDay/:id', ProjectProductivityController.productivityByDay);

export default routes;

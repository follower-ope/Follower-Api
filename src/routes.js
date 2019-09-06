import { Router } from 'express';

const routes = new Router();

routes.get('/', () => {
  console.log('Hello World');
});

export default routes;

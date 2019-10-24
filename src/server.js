import app from './app';
import ProfileController from './app/controllers/ProfilesController';

app.listen(3333, () => {
  ProfileController.store('administrador');
});

import Profile from '../models/Profile';

class ProfileController {
  async store(description) {
    await Profile.findOrCreate({
      where: {
        description,
      },
      defaults: {
        description,
      },
    });
  }
}

export default new ProfileController();

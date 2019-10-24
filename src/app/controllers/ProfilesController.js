import Profile from '../models/Profile';

class ProfileController {
  async store(description) {
    const profile = await Profile.findOrCreate({
      where: {
        description,
      },
      defaults: {
        description,
      },
    });

    return profile;
  }
}

export default new ProfileController();

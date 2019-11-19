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

  async index(req, res) {
    const profiles = await Profiles.findAll();

    return res.json(profiles);
  }

  async show(req, res) {
    const { id } = req.params;

    const profile = await Profile.findOne({ where: { id } });

    return res.json(profile);
  }

  async update(req, res) {
    const { id } = req.params;

    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(400).json({ error: 'Profile not found' });
    }

    const { description } = await profile.update(req.body);

    return res.json({ id, description });
  }

  async delete(req, res) {
    const { id } = req.params;

    const dbResponse = await Profile.destroy({ where: { id } });

    if (!dbResponse) {
      return res.status(400).json({ error: 'Delete error' });
    }
    return res.json({ ok: true });
  }
}

export default new ProfileController();

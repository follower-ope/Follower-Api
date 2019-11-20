import Profile from '../models/Profile';

class ProfilesController {
  async store(req, res) {
    const { description } = req.body;

    const profileExists = await Profile.findOne({
      where: {
        description,
      },
    });

    if (profileExists) {
      return res
        .status(400)
        .json({ error: `Profile '${profileExists.description}' already exists.`});
    }

    const profile = await Profile.create(req.body);

    return res.json(profile);
  }
  /*async store(description) {
    await Profile.findOrCreate({
      where: {
        description,
      },
      defaults: {
        description,
      },
    });
  }*/

  async index(req, res) {
    const profiles = await Profile.findAll();

    return res.json(profiles);
  }

  async show(req, res) {
    const { id } = req.params;

    const profile = await Profile.findOne({ where: { id } });

    if (!profile) {
      return res
        .status(400)
        .json({ error: 'Profile does not exists.'});
    }

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

export default new ProfilesController();

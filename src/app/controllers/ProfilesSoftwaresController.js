import ProfilesSoftwares from '../models/ProfilesSoftwares';
import Profile from '../models/Profile';
import Softwares from '../models/Softwares';

class ProfilesSoftwaresController {
  async store(req, res) {
    const profileExists = await Profile.findOne({
      where: {
        id: req.body.profile_id,
      },
    });

    if (!profileExists) {
      return res
        .status(400)
        .json({ error: `Profile '${req.body.profile_id}' does not exists.` });
    }

    const softwareExists = await Softwares.findOne({
      where: {
        process_name: req.body.process_name,
      },
    });

    if (!softwareExists) {
      return res.status(400).json({
        error: `Software '${req.body.process_name}' does not exists.`,
      });
    }

    const profilesSoftwaresExists = await ProfilesSoftwares.findOne({
      where: {
        profile_id: req.body.profile_id,
        software_id: req.body.process_name,
      },
    });

    if (profilesSoftwaresExists) {
      return res.status(400).json({
        error: `Profile: ${profilesSoftwaresExists.profile_id}
          Software: ${profilesSoftwaresExists.process_name} already exists.`,
      });
    }

    const profileSoftware = await ProfilesSoftwares.create({
      software_id: req.body.process_name,
      profile_id: req.body.profile_id,
      is_productive: req.body.is_productive,
    });

    return res.json(profileSoftware);
  }

  async index(req, res) {
    const profilesSoftware = await ProfilesSoftwares.findAll();

    return res.json(profilesSoftware);
  }

  async indexProfile(req, res) {
    const profilesSoftware = await ProfilesSoftwares.findAll({
      where: {
        profile_id: req.params.profileId,
      },
    });

    return res.json(profilesSoftware);
  }

  async update(req, res) {
    const profilesSoftware = await ProfilesSoftwares.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!profilesSoftware) {
      return res.status(400).json({ error: 'Profile Software not found' });
    }

    const profileSoftware = await profilesSoftware.update(req.body);

    return res.json({
      id: req.params.id,
      profile_id: profilesSoftware.profile_id,
      process_name: profileSoftware.process_name,
      is_productive: profileSoftware.is_productive,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const dbResponse = await ProfilesSoftwares.destroy({ where: { id } });

    if (!dbResponse) {
      return res.status(400).json({ error: 'Delete error' });
    }
    return res.json({ ok: true });
  }
}

export default new ProfilesSoftwaresController();

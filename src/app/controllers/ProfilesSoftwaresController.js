import ProfilesSoftwares from '../models/ProfilesSoftwares';
import Profile from '../models/Profile';
import Softwares from '../models/Softwares'; 

class ProfilesSoftwaresController {
  async store(req, res) {
    //profileId: Sequelize.INTEGER,
    //process_name: Sequelize.STRING,
    //isProductive: Sequelize.BOOLEAN

    console.log(req.body.profileId)
    console.log(req.body.process_name)
    console.log(req.body.isProductive)

    const { profileId, process_name} = req.body;

    const profileExists = await Profile.findOne({
        where: {
            id: profileId,
        },
    });
  
    if (!profileExists) {
    return res
        .status(400)
        .json({ error: `Profile '${profileId}' does not exists.`});
    }
    
    //console.log("profile ok")
    const softwareExists = await Softwares.findOne({
        where: {
            process_name,
        },
    });

    if (!softwareExists) {
    return res
        .status(400)
        .json({ error: `Software '${process_name}' does not exists.`});
    }
    //console.log("software ok")

    const profilesSoftwaresExists = await ProfilesSoftwares.findOne({
      where: {
        profileId
      },
    });

    console.log("erro pós query")
    if (profilesSoftwaresExists) {
        return res
            .status(400)
            .json({ error: `Profile: ${profilesSoftwaresExists.profileId} Software: ${profilesSoftwaresExists.process_name}
            already exists.`});
    }

    const profileSoftware = await ProfilesSoftwares.create(req.body);

    return res.json(profileSoftware);
  }
/*
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
  }*/
}

export default new ProfilesSoftwaresController();

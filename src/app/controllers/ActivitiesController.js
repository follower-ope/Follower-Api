import Activitie from '../models/Activitie';
import User from '../models/User';
import Softwares from '../models/Softwares';

class ActivitiesController {
  async index(req, res) {
    const activities = await Activitie.findAll();

    return res.json(activities);
  }

  async show(req, res) {
    const { username } = req.params;

    const activities = await Activitie.findAll({
      where: { username },
    });

    return res.json(activities);
  }

  async store(req, res) {
    const { username, process_name, software_name: name, time } = req.body;

    await User.findOrCreate({
      where: {
        username,
      },
      defaults: {
        username,
      },
    });

    await Softwares.findOrCreate({
      where: {
        process_name,
      },
      defaults: {
        process_name,
        name,
      },
    });

    const activitie = await Activitie.create({
      username,
      softwares_id: process_name,
      time,
    });

    return res.json(activitie);
  }
}

export default new ActivitiesController();

import Activitie from '../models/Activitie';

class ActivitiesController {
  async index(req, res) {
    var activities = await Activitie.findAll();

    return res.json(activities);
  }

  async userActivities(req, res) {
    const { username } = req.params;

    var activities = await Activitie.findAll({
      where: { userName: username },
    });

    return res.json(activities);
  }

  async store(req, res) {
    const { userName, proccessName, horario } = req.body;

    const activitie = await Activitie.create({
      userName,
      proccessName,
      horario,
    });

    return res.json(activitie);
  }
}

export default new ActivitiesController();

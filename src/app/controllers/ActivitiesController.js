import Activitie from '../models/Activitie';

class ActivitiesController {
  async index(req, res) {
    const { id } = req.params;

    var activitie = await Activitie.findByPk(id);

    return res.json(activitie);
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

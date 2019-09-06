import Activitie from '../models/Activitie';

class ActivitiesController {
  async store(req, res) {
    const activitie = await Activitie.create({
      id: 1,
      proccessName: 'proccess',
      horario: new Date(),
    });

    return res.json(activitie);
  }
}

export default new ActivitiesController();

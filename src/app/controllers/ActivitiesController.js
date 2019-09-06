import Activitie from '../models/Activitie';

class ActivitiesController {
  async store(req, res) {
    // await Activitie.create({
    //   id: 1,
    //   proccessName: 'proccess',
    //   horario: new Date(),
    // });

    console.log(Activitie);
    const lol = await Activitie.findAll();

    console.log(lol);
    return res.json({ status: 'OK' });
  }
}

export default new ActivitiesController();

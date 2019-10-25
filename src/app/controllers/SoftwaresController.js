import Softwares from '../models/Softwares';

class SoftwaresController {
  async store(softwareData) {
    const { process_name, name } = softwareData;

    const processExists = await Softwares.findOne({
      where: {
        process_name,
      },
    });

    if (processExists) {
      return;
    }

    await Softwares.create({
      process_name,
      name,
    });
  }

  async index(req, res) {
    const softwares = await Softwares.findAll();

    return res.json(softwares);
  }
}

export default new SoftwaresController();

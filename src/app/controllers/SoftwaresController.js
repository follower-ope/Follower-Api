import Softwares from '../models/Softwares';
import SoftwareProfiles from '../models/ProfilesSoftwares';
import Profiles from '../models/Profile';

class SoftwaresController {
  async store(softwareData) {
    try {
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
      }).then(x => {
        return x.get('id');
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  async index(req, res) {
    try {
      const softwares = await Softwares.findAll();

      return res.json(softwares);
    } catch (err) {
      return res.status(500).json({ error: 'Unable to get softwares' });
    }
  }

  async indexProfileBySoftware(req, res) {
    try {

      const softwares = await SoftwareProfiles.findAll({
        attributes: [],
        where: {
          software_id: req.params.id
        },
        include: [Profiles],
      });

      return res.json(softwares);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Unable to get profiles by software' });
    }
  }

}

export default new SoftwaresController();

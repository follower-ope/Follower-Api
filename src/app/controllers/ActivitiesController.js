import { parseISO, startOfDay, endOfDay } from 'date-fns';
import Sequelize from 'sequelize';
import * as Yup from 'yup';

import Activitie from '../models/Activitie';
import User from '../models/User';
import Softwares from '../models/Softwares';
import Projects from '../models/Projects';

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

    let user = await User.findOne({ where: { username } });

    if (!user) {
      user = await User.create({ username });
    }

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
      project_id: user.project_id,
    });

    return res.json(activitie);
  }

  async update(req, res) {
    try{
      const schema = Yup.object().shape({
        project_id: Yup.number(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fail' });
      }

      const { id } = req.params;

      const activitie = await Activitie.findOne({
        where: {
          id
        }
      });

      if(!activitie) {
        return res.status(400).json({ error: 'Activities does not exists' });
      }

      const { project_id } = req.body;

      await Activitie.update({
        project_id
      },
      { where: { id } }
      );

      return res.json({ message: 'Activitie updated' });
    } catch(err) {
      return res.status(500).json({error: 'Unable to update activtie'});
    }
  }

  async updateProjectByRange(req, res) {
    const { Op } = Sequelize;
    const { startDate, endDate, project_id } = req.body;
    const { username } = req.params;

    const startRange = await startOfDay(parseISO(startDate));
    const endRange = await endOfDay(parseISO(endDate));

    try {
      const userExists = await User.findOne({ where: { username } });

      if (!userExists) {
        return res.status(400).json({ message: 'User does not exists' });
      }

      if (project_id) {
        const projectExists = await Projects.findByPk(project_id);

        if (!projectExists) {
          return res.status(400).json({ message: 'Project does not exists' });
        }
      }

      await Activitie.update(
        {
          project_id,
        },
        {
          where: { time: { [Op.between]: [startRange, endRange] }, username },
        }
      );

      return res.json({ message: 'Activities was updated sucessfull' });
    } catch (err) {
      return res.status(500).json({ message: 'Unable to update activities' });
    }
  }

  async listProjectlessActivities(req, res) {
    try {
      const { username } = req.params;


      const userExists = await User.findOne({ where: { username } });

      if (!userExists) {
        return res.status(400).json({ message: 'User does not exists' });
      }

      const activities = await Activitie.findAll({
        where:{
          username,
          project_id: null
        }
      })


      return res.json(activities);
    } catch(err) {
      return res.status(500).json({ error: 'Unable to get activities', err });
    }
  }
}

export default new ActivitiesController();

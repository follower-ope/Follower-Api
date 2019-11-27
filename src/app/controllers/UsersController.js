import * as Yup from 'yup';
import User from '../models/User';
import Projects from '../models/Projects';
import Profile from '../models/Profile';

class UsersController {
  async index(req, res) {
    const users = await User.findAll({
      where: { disabled_at: null },
      attributes: ['username', 'name', 'email', 'disabled_at'],
      include: [Projects, Profile],
    });

    return res.json(users);
  }

  async indexIncomplete(req, res) {
    try {
      const users = await User.findAll({
        where: { name: null },
        attributes: ['username', 'name', 'email', 'disabled_at'],
        include: [Projects, Profile],
      });

      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: 'Unable to get users' });
    }
  }

  async show(req, res) {
    const { username } = req.params;

    const user = await User.findAll({
      where: { username },
      attributes: ['username', 'name', 'email', 'disabled_at'],
      include: [Projects, Profile],
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fail ' });
    }

    const { username, email } = req.body;

    const userExists = await User.findOne({
      where: { username },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const emailUsed = await User.findOne({ where: { email } });

    if (emailUsed) {
      return res.status(400).json({ message: 'Email already used' });
    }

    try {
      const user = await User.create(req.body);

      const { name } = user;

      return res.json({ username, name, email });
    } catch (error) {
      return res.status(500).json({ message: 'Unable to get users' });
    }
  }

  async update(req, res) {
    const { username } = req.params;
    const { name, email, project_id, profile_id } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ message: 'Email already used' });
      }
    }

    if (profile_id && profile_id !== user.profile_id) {
      const profileExists = await Profile.findByPk(profile_id);

      if (!profileExists) {
        return res.status(400).json({ message: 'Profile does not exists' });
      }
    }

    if (project_id && project_id !== user.project_id) {
      const projectExists = await Projects.findByPk(project_id);

      if (!projectExists) {
        return res.status(400).json({ message: 'Project does not exists' });
      }
    }

    try {
      await User.update(
        {
          name,
          email,
          project_id,
          profile_id,
        },
        { where: { username } }
      );
      return res.json({ username, name, email, profile_id, project_id });
    } catch (err) {
      return res.status(500).json({ message: 'Unable to update user' });
    }
  }

  async delete(req, res) {
    const { username } = req.params;

    try {
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        return res.status(400).json({ message: 'User does not exists!' });
      }

      const disabled_at = Date.now();

      await user.update({
        disabled_at,
      });

      return res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Unexpected fail', err });
    }
  }
}

export default new UsersController();

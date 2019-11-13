import User from '../models/User';
import Activitie from '../models/Activitie';

class UsersController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async indexIncomplete(req, res) {
    try {
      const users = await User.findAll({ where: { name: null } });

      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: 'Unable to get users' });
    }
  }

  async show(req, res) {
    const { username } = req.params;

    const user = await User.findAll({
      where: { username },
    });

    return res.json(user);
  }

  async store(req, res) {
    const { username } = req.body;

    const userExist = await User.findOne({
      where: { username },
    });

    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    try {
      const user = await User.create(req.body);

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Unable to get users' });
    }
  }

  async update(req, res) {
    const user = await User.findAll({
      where: { userName: req.params.username },
    });

    if (user.length === 0) {
      return res.status(400).json('Usuario nao encontrado na base de dados!');
    }

    const response = await User.update(
      {
        name: req.body.name,
        role: req.body.role,
      },
      { where: { userName: req.params.username } }
    );

    if (response) {
      return res.status(200).json('Usuario alterado com sucesso!');
    }
    return res.status(400).json('Falha na alteracao do Usuario!');
  }

  async delete(req, res) {
    const activities = await Activitie.findAll({
      where: { userName: req.params.username },
    });

    if (activities.length > 0) {
      return res
        .status(400)
        .json(
          'Nao eh possivel excluir um Usuario que possua atividades vinculadas no sistema!'
        );
    }

    const user = await User.findAll({
      where: { userName: req.params.username },
    });

    if (user.length === 0) {
      return res.status(400).json('Usuario nao encontrado na base de dados!');
    }

    const response = await User.destroy({
      where: { userName: req.params.username },
    });

    if (response) {
      return res.status(200).json('Usuario excluido com sucesso!');
    }
    return res.status(400).json('Falha na exclusao do Usuario!');
  }
}

export default new UsersController();

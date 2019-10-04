import User from '../models/User';
import Activitie from '../models/Activitie';

class UsersController {
    async index(req, res) {
        var users = await User.findAll();

        return res.json(users);
    }

    async show(req, res) {
        const { username } = req.params

        var user = await User.findAll({
            where: { userName: username },
        });

        return res.json(user);
    }

    async store(req, res) {
        const { userName, name, role } = req.body;

        var user_exist = await User.findAll({
            where: { userName: userName },
        });

        if (user_exist.length > 0){
            return res.status(400).json("UserName ja utilizado no sistema!")
        }

        const user = await User.create({
            userName,
            name,
            role,
        });

        return res.json(user);
    }

    async update(req, res) {
        var user = await User.findAll({
            where: { userName: req.params.username },
        });

        if (user.length == 0){
            return res.status(400).json("Usuario nao encontrado na base de dados!")
        }

        const response = await User.update(
            { name: req.body.name,
              role: req.body.role
            },
            { where: { userName: req.params.username }}
        )

        if (response){
            return res.status(200).json("Usuario alterado com sucesso!")
        } else{
            return res.status(400).json("Falha na alteracao do Usuario!")
        }
    }

    async delete(req, res) {
        var activities = await Activitie.findAll({
            where: { userName: req.params.username },
        });

        console.log(activities)

        if (activities.length > 0){
            return res.status(400).json("Nao eh possivel excluir um Usuario que possua atividades vinculadas no sistema!")
        }

        var user = await User.findAll({
            where: { userName: req.params.username },
        });

        if (user.length == 0){
            return res.status(400).json("Usuario nao encontrado na base de dados!")
        }

        const response = await User.destroy({
            where: { userName : req.params.username}
        });

        if (response){
            return res.status(200).json("Usuario excluido com sucesso!")
        } else{
            return res.status(400).json("Falha na exclusao do Usuario!")
        }
    }
}

export default new UsersController();

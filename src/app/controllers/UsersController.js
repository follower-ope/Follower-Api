import User from '../models/User';

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

        const user = await User.create({
            userName,
            name,
            role,
        });

        return res.json(user);
    }

    async update(req, res) {
        console.log(req.params)
        console.log(req.body)
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

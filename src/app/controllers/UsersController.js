import User from '../models/User';

class UsersController {
    async index(req, res) {
        var users = await User.findAll();

        return res.json(users);
    }

    async show(req, res) {
        const { username } = req.params;

        var users = await User.findAll({
            where: { userName: username },
        });

        return res.json(users);
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
        const user = await User.update(
            { name: req.body.name },
            { role: req.body.role },
            { where: { userName: req.param.userName }}
        )
        
        return res.json(user);
    }

    async delete(req, res) {
        const user = await User.delete({
            where: { userName : req.param.userName}
        });

        return res.json(user);
    }
}

export default new UsersController();

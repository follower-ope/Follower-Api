import Sequelize from '../../config/sequelize';
import User from '../models/User';

class UsersActivitiesController {
  async index(req, res) {

    if (req.body.username != null){
      
      const userExists = await User.findOne({
        where: { username: req.body.username },
      });

      if (!userExists) {
        return res.status(400).json({ error: 'User does not exists' });
      }
    }

    const usersActivities = await Sequelize.query(
        'SELECT username, ' +
        '(SELECT time ' +
        ' FROM activities ' +
        ' WHERE DATE(time) = atv.time ' +
        '   AND username = atv.username' +
        ' ORDER BY time ASC ' +
        'LIMIT 1) AS startDate, ' +
        '(SELECT time ' +
        '  FROM activities ' +
        '  WHERE DATE(time) = atv.time ' +
        '   AND username = atv.username' +
        '  ORDER BY time DESC ' +
        '  LIMIT 1) AS finishDate ' +
        'FROM (SELECT DISTINCT DATE(time) AS time, username ' +
        '    FROM activities ' +
        'WHERE ' +
        "   DATE(time) >= '" + req.body.startDate + "' " +
        "   AND DATE(time) <= '" + req.body.endDate + "' " +
        (req.body.username != null ? 
          "   and username = '" + req.body.username + "' ) atv " : 
          ") atv")
    );

    return res.status(200).json(usersActivities[0]);
  }
}

export default new UsersActivitiesController();

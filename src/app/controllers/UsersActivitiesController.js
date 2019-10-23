import UsersActivities from '../models/UsersActivities';
import Sequelize from '../../config/sequelize';

class UsersActivitiesController {
  async index(req, res) {

    console.log(req.params)
    //console.log(res)

    const usersActivities = await Sequelize.query(
      "SELECT userId, "+
      "(SELECT timestamp " +
      " FROM activities " +
      " WHERE DATE(timestamp) = DATE " +
      " ORDER BY timestamp ASC " +
      "LIMIT 1) AS startDate, " +
      "(SELECT timestamp " +
      "  FROM activities " +
      "  WHERE DATE(timestamp) = DATE " +
      "  ORDER BY timestamp DESC " +
      "  LIMIT 1) AS finishDate " +
      "FROM (SELECT DISTINCT DATE(timestamp) AS DATE, userId " +
      "    FROM activities " +
      "WHERE " +
      "   date >= '2019-10-20' " +
      "   and date <= '2019-10-23')",{
      //replacements: {startDate: req.body.startDate, endDate: req.body.endDate},
      model: Sequelize.UsersActivities,
      mapToModel: true
      //type: Sequelize.QueryTypes.SELECT
    });

    console.log(usersActivities)

    const data = {
      usersActivities: usersActivities
    };

    console.log(data)

    return res.status(200).json(data)
  }
}

export default new UsersActivitiesController();

import Sequelize from '../../config/sequelize';

class UsersActivitiesController {
  async index(req, res) {

    console.log(req.body)

    const usersActivities = await Sequelize.query(
      "SELECT username, "+
      "(SELECT time " +
      " FROM activities " +
      " WHERE DATE(time) = DATE " +
      " ORDER BY time ASC " +
      "LIMIT 1) AS startDate, " +
      "(SELECT time " +
      "  FROM activities " +
      "  WHERE DATE(time) = DATE " +
      "  ORDER BY time DESC " +
      "  LIMIT 1) AS finishDate " +
      "FROM (SELECT DISTINCT DATE(time) AS DATE, username " +
      "    FROM activities " +
      "WHERE " +
      "   date >= '" + req.body.startDate + "' " +
      "   and date <= '" + req.body.endDate + "')");

    const data = {
      usersActivities: usersActivities
    };

    return res.status(200).json(data)
  }
}

export default new UsersActivitiesController();
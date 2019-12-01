import Sequelize from '../../config/sequelize';

class UsersActivitiesController {
  async index(req, res) {
    const usersActivities = await Sequelize.query(
      `${'SELECT username, ' +
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
        "   DATE(time) >= '"}${req.body.startDate}' ` +
        `   and DATE(time) <= '${req.body.endDate}') atv`
    );

    return res.status(200).json(usersActivities[0]);
  }
}

export default new UsersActivitiesController();

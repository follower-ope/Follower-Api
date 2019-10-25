import Sequelize, { Model } from 'sequelize';

class Activitie extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        proccess: Sequelize.STRING,
        time: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }
}

export default Activitie;

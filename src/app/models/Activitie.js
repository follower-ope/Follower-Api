import Sequelize, { Model } from 'sequelize';

class Activitie extends Model {
  static init(sequelize) {
    super.init(
      {
        userName: Sequelize.STRING,
        proccessName: Sequelize.STRING,
        horario: Sequelize.DATE,
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

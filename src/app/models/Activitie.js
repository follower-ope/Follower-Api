import Sequelize, { Model } from 'sequelize';

class Activitie extends Model {
  static init(sequelize) {
    super.init(
      {
        proccessName: Sequelize.STRING,
        horario: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    console.log(sequelize);

    return this;
  }
}

export default Activitie;

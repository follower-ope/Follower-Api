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

    console.log(this);

    return this;
  }
}

export default Activitie;

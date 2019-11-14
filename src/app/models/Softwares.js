import Sequelize, { Model } from 'sequelize';

class Softwares extends Model {
  static init(sequelize) {
    super.init(
      {
        process_name: Sequelize.STRING,
        name: Sequelize.STRING,
        productive: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    Softwares.removeAttribute('id');

    return this;
  }
}

export default Softwares;
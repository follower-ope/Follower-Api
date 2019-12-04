import Sequelize, { Model } from 'sequelize';

class Softwares extends Model {
  static init(sequelize) {
    super.init(
      {
        process_name: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        name: Sequelize.STRING,
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

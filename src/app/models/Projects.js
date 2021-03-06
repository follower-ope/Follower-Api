import Sequelize, { Model } from 'sequelize';

class Projects extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        time: Sequelize.INTEGER,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }
}

export default Projects;

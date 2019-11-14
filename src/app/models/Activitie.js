import Sequelize, { Model } from 'sequelize';

class Activitie extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        softwares_id: Sequelize.STRING,
        time: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Softwares, { foreignKey: 'process_name' });
    this.belongsTo(models.Projects, { foreignKey: 'project_id' });
  }
}

export default Activitie;

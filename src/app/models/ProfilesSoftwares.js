import Sequelize, { Model } from 'sequelize';

class softwares_profiles extends Model {
  static init(sequelize) {
    super.init(
      {
        profile_id: Sequelize.INTEGER,
        software_id: Sequelize.STRING,
        is_productive: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Softwares, { foreignKey: 'software_id' });
    this.hasOne(models.Profile, { foreignKey: 'profile_id' });
  }
}

export default softwares_profiles;

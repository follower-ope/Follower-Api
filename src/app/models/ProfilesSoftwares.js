import Sequelize, { Model } from 'sequelize';

class softwares_profiles extends Model {
  static init(sequelize) {
    super.init(
      {
        profile_id: Sequelize.INTEGER,
        process_name: Sequelize.STRING,
        is_productive: Sequelize.BOOLEAN
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Softwares, { foreignKey: 'process_name'});
    this.belongsTo(models.Profile, { foreignKey: 'profile_id'});
  }
}

export default softwares_profiles;

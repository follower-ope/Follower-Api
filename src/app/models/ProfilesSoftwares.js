import Sequelize, { Model } from 'sequelize';

class ProfilesSoftwares extends Model {
  static init(sequelize) {
    super.init(
      {
        profileId: Sequelize.INTEGER,
        process_name: Sequelize.STRING,
        isProductive: Sequelize.BOOLEAN
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
    this.belongsTo(models.Profile, { foreignKey: 'profile_id' });
  }
}

export default ProfilesSoftwares;

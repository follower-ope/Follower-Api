import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        disabled_at: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Projects, { foreignKey: 'project_id' });
    this.belongsTo(models.Profile, { foreignKey: 'profile_id' });
  }
}

export default User;

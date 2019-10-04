import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        userName: Sequelize.STRING,
        name: Sequelize.STRING,
        role: Sequelize.STRING
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }
}

export default User;

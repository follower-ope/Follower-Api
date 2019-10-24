import Sequelize, { Model } from 'sequelize';

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    return this;
  }
}

export default Profile;

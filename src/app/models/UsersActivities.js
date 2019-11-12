import Sequelize, { Model } from 'sequelize';

export class UsersActivities extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        startDate: Sequelize.timestamps,
        finishDate: Sequelize.timestamps,
      },
      {
        sequelize,
        timestamps: false,
      }
    );
    return this;
  }
}

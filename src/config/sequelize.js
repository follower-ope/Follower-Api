import Sequelize from 'sequelize';

import databaseConfig from './database';

class SequelizeClass {
  async query(st) {
    this.seq = new Sequelize(databaseConfig);

    return await this.seq.query(st);
  }
}

export default new SequelizeClass();

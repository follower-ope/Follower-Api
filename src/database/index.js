import Sequelize from 'sequelize';

import Activitie from '../app/models/Activitie';
import Projects from '../app/models/Projects';
import User from '../app/models/User';
import Profiles from '../app/models/Profile';
import Softwares from '../app/models/Softwares';
import ProfilesSoftwares from '../app/models/ProfilesSoftwares';

import databaseConfig from '../config/database';

const models = [Activitie, Projects, User, Profiles, Softwares, ProfilesSoftwares];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

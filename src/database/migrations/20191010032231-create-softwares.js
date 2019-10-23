'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('softwares', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      processName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
  
};

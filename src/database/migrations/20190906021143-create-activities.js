module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('activities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      proccessName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        type: 'TIMESTAMP',
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      processId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'softwares',
          key: 'id'
        },
        allowNull: false
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('activities');
  }
};

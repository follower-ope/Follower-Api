module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('projects');
  },
};

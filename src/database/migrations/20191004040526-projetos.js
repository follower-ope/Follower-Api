module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('projects');
  },
};

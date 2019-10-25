module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('softwares', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      process_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      productive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('projects');
  },
};

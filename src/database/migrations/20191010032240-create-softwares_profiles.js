module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('softwares_profiles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      isProductive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('projects');
  },
};

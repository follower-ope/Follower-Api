module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disabled_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};

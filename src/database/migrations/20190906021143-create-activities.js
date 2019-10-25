module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('activities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'username',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      softwares_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'softwares',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('activities');
  },
};

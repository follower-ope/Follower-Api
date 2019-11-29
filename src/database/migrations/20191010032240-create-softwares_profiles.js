module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('softwares_profiles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      is_productive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      profile_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'profiles',
          key: 'id',
        },
      },
      software_id: {
        type: Sequelize.STRING,
        references: {
          model: 'softwares',
          key: 'process_name',
        },
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('softwares_profiles');
  },
};

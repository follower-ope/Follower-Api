module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('softwares_profiles', 'process_name', {
        type: Sequelize.INTEGER,
        references: { model: 'softwares', key: 'process_name' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      });
    },
  
    down: queryInterface => {
      return queryInterface.removeColumn('softwares_profiles', 'process_name');
    },
  };
  
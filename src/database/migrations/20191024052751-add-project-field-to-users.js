module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'project_id', {
      type: Sequelize.INTEGER,
      references: { model: 'projects', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('project_id');
  },
};

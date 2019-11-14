module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('activities', 'project_id', {
      type: Sequelize.INTEGER,
      references: { model: 'projects', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('activities', 'project_id');
  },
};

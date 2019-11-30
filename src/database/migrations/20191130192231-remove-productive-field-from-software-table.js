module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('softwares', 'productive');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('softwares', 'productive', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
};

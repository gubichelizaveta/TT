module.exports = (Sequelize, sequelize) => {
    return sequelize.define('TournamentType', {
      type_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      tournament_type_name: {
          type: Sequelize.STRING,
          allowNull: false
      }
    });
};
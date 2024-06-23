module.exports = (Sequelize, sequelize) => {
    return sequelize.define('TournamentLevel', {
      level_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      tournament_level_name: {
          type: Sequelize.STRING,
          allowNull: false
      }
    });
  };
  
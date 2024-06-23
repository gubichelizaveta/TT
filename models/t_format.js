module.exports = (Sequelize, sequelize) => {
    return sequelize.define('TournamentFormat', {
      format_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      tournament_format_name: {
          type: Sequelize.STRING,
          allowNull: false
      }
    });
};
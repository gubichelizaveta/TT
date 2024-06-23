module.exports = (Sequelize, sequelize) => {
    const Tournament = require('./tournament')(Sequelize, sequelize);
    const Player = require('./player')(Sequelize, sequelize);
    const Team = require('./team')(Sequelize, sequelize);
  
    return sequelize.define('TournamentParticipant', {
      participant_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      tournament: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: Tournament,
              key: 'tournament_id'
          }
      },
      player: {
          type: Sequelize.INTEGER,
          references: {
              model: Player,
              key: 'player_id'
          }
      },
      team: {
          type: Sequelize.INTEGER,
          references: {
              model: Team,
              key: 'team_id'
          }
      }
    });
  };
  
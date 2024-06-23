module.exports = (Sequelize, sequelize) => {
    const TournamentFormat = require('./t_format')(Sequelize, sequelize);
    const TournamentLevel = require('./t_level')(Sequelize, sequelize);
    const TournamentType = require('./t_type')(Sequelize, sequelize);
  
    return sequelize.define('Tournament', {
      tournament_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      tournament_name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      start_date: {
          type: Sequelize.DATE,
          allowNull: false
      },
      end_date: {
          type: Sequelize.DATE,
          allowNull: false
      },
      number_participants: {
          type: Sequelize.INTEGER
      },
      location: {
          type: Sequelize.STRING,
          allowNull: false
      },
      format: {
          type: Sequelize.INTEGER,
          
          references: {
              model: TournamentFormat,
              key: 'format_id'
          }
      },
      level: {
          type: Sequelize.INTEGER,
         
          references: {
              model: TournamentLevel,
              key: 'level_id'
          }
      },
      type: {
          type: Sequelize.INTEGER,
          
          references: {
              model: TournamentType,
              key: 'type_id'
          }
      }
    });
    
  };
  
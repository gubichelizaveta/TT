module.exports = (Sequelize, sequelize) => {
    const User = require('./users')(Sequelize, sequelize);
    const SportsRang = require('./sportsrang')(Sequelize, sequelize);
  
    return sequelize.define('Player', {
      player_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          references: {
              model: User,
              key: 'id'
          }
      },
      LastName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      MiddleName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      SportRang: {
          type: Sequelize.INTEGER,
          references: {
              model: SportsRang,
              key: 'rang_id'
          }
      },
      Team: {
          type: Sequelize.STRING
      },
      BirthYear: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
    });
  };
  
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('SportsRang', {
      rang_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      rang: {
          type: Sequelize.STRING,
          allowNull: false
      },
      description: {
          type: Sequelize.STRING
      }
    });
  };
  
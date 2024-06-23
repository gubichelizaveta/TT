module.exports = (Sequelize, sequelize) => {
    const Tournament = require('./tournament')(Sequelize, sequelize);
    const User = require('./users')(Sequelize, sequelize);
    return sequelize.define('TournamentApplication', {
    application_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tournament_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Tournament,
            key: 'tournament_id'
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    application_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
});
};

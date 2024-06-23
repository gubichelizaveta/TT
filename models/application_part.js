module.exports = (Sequelize, sequelize) => {
    const TournamentApplication = require('./t_application')(Sequelize, sequelize);
    return  sequelize.define('ApplicationParticipant', {
    application: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: TournamentApplication,
            key: 'application_id'
        }
    },
    participant_order: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middle_name: {
        type: Sequelize.STRING
    },
    birth_year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rank: {
        type: Sequelize.STRING
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coach_name: {
        type: Sequelize.STRING
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
};

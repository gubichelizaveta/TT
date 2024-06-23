module.exports = (Sequelize, sequelize) => {
    const Player = require('./player')(Sequelize, sequelize);
    const Tournament = require('./tournament')(Sequelize, sequelize);
    const Team = require('./team')(Sequelize, sequelize);
    return sequelize.define('Match', {
    match_id: {
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
    match_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    player1_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Player,
            key: 'player_id'
        }
    },
    player2_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Player,
            key: 'player_id'
        }
    },
    team1_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Team,
            key: 'team_id'
        }
    },
    team2_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Team,
            key: 'team_id'
        }
    },
    winner_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Player,
            key: 'player_id'
        }
    },
    winnerTeam_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Team,
            key: 'team_id'
        }
    },
    score: {
        type: Sequelize.STRING(50)
    }
});
};

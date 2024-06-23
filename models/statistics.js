module.exports = (Sequelize, sequelize) => {
    const Player = require('./player')(Sequelize, sequelize);
    return sequelize.define('StatisticsPl', {
    statistic_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Player,
            key: 'player_id'
        }
    },
    wins: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    losses: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    matches_played: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    win_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.00
    }
});
};

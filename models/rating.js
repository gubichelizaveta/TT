module.exports = (Sequelize, sequelize) => {
    const Player = require('./player')(Sequelize, sequelize);
    return sequelize.define('Rating', {
    rating_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Player,
            key: 'player_id'
        }
    },
    rating: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    rating_date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});
}

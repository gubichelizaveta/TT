module.exports = (Sequelize, sequelize) => {

    return sequelize.define('Team', {
    team_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    team_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});
};



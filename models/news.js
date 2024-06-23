module.exports = (Sequelize, sequelize) => {
    return sequelize.define('News', {
        news_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: true,
        }
});
};

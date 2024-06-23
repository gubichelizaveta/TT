module.exports = (Sequelize, sequelize) => {
    const Team = require('./team')(Sequelize, sequelize);
    const Player = require('./player')(Sequelize, sequelize);
    return sequelize.define('TeamMember', {
        team: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: Team,
                key: 'team_id'
            }
        },
        player: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: Player,
                key: 'player_id'
            }
        }
    }, {
        primaryKey: [
            { field: 'team', name: 'team_pk' },
            { field: 'player', name: 'player_pk' }
        ]
    });

};

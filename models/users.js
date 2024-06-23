module.exports = (Sequelize, sequelize) => {
  const Role = require('./role')(Sequelize, sequelize);

  return sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'role_id'
        }
    }
  });
};



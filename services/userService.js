
const bcrypt = require('bcrypt');
const User = require('../context').User;
const Player = require('../context').Player;

module.exports = {
    CreateUser: async (UserName, Password) => {
        try {
            const hashedPassword = await bcrypt.hash(Password, 10);
            const newUser = await User.create({
              login: UserName,
              password: hashedPassword,
              role: 1
            });
            return newUser;
          } catch (error) {
            throw new Error(error.message);
          }
    },
    getAllUsers: async () => {
        try {
            const users = await User.findAll({
                attributes: [
                    ['login', 'UserName'], 
                    ['password', 'Password'] 
                ]
            });
            return users;
          } catch (error) {
            throw new Error(error.message);
          }
    },
    findUserByUserNameAndPassword: async (UserName, Password) => {
        const user = await User.findOne({ where: { login: UserName } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(Password, user.password);
        return isPasswordValid;
    },
    getUserId: async (UserName) => {
      const user = await User.findOne({ where: { login: UserName } });
      if (!user) {
          throw new Error('User not found');
      }
      return user.id;
    },
    getPlayerId: async (UserId) => {
      const id = parseInt(UserId);
      const player = await Player.findOne({ where: { user_id: id } });
      if (!player) {
          throw new Error('User not found');
      }
      return player.player_id;
    }

};
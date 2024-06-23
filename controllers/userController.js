
const userService = require('../services/userService');
const User = require('../context').User;


module.exports = {
    CreateUser: async (req, res) => {
        try {
            const { UserName, Password } = req.body;
            await userService.CreateUser(UserName, Password);
            res.status(200).json('UserAddDone');
          } catch (error) {
            res.status(500).send({ error: error.message });
          }
    },
    getAllUsers: async (req, res) => {
      try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    },
    getUser: async (req, res) => {
      const { UserName, Password } = req.params;
      try {
        const isPasswordValid = await userService.findUserByUserNameAndPassword(UserName, Password);
        res.status(200).json(isPasswordValid);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
    getIdByName: async (req, res) => {
      const { UserName } = req.params;
      try {
        const userId = await userService.getUserId(UserName);
        res.status(200).json(userId);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
    getPlayerId: async (req, res) => {
      const { UserId } = req.params;
      console.log(`Received UserId: ${UserId}`);
      try {
        const playerId = await userService.getPlayerId(UserId);
        res.status(200).json(playerId);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
};


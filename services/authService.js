const User = require('../context').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (name, password) => {
        const user = await User.findOne({ where: { login: name } });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.role !== 3) {
            throw new Error('Access denied');
        }
        const validPassword = password === user.password;
        if (!validPassword) {
            throw new Error('Invalid password');
        }        
        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
        return token;
    }
};

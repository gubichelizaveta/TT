const authService = require('../services/authService');

module.exports = {
    authenticate: async (req, res, next) => {
        try {
            const { name, password } = req.body;
            const token = await authService.login(name, password);
            res.redirect('/admin/dashboard');
            //res.json({ token }); 
        } catch (error) {
            next(error); 
        }
    }
};

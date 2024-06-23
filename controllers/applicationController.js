const { where } = require('sequelize');
const applicationService = require('../services/applicationService');
const TournamentApplications = require('../context').TournamentApplication;
const User = require('../context').User;
const Tournament = require('../context').Tournament;

module.exports = {
    getAllApplications: async (req, res) => {
        try {
            const applications = await applicationService.getAllApplications();
            res.json(applications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    getAllTeamApplications: async (req, res) => {
        try {
            const applications = await applicationService.getAllTeamApplications();
            res.json(applications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    checkPlayer: async (req, res) => {
        try {
            const { lastName, firstName, middleName, birthYear } = req.query;
            const isPlayer = await applicationService.checkPlayer(lastName, firstName, middleName, birthYear);
            res.json({ isPlayer });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },
    checkTeam: async (req, res) => {
        try {
            const { TeamName } = req.query;
            const isTeam = await applicationService.checkTeam(TeamName);
            res.json({ isTeam });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },
    checkLogin: async (req, res) => {
        try {
            const { login } = req.query;
            const userID = await applicationService.checkLogin(login);
            res.json({ userID });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },

    createPlayer: async (req, res) => {
        try {
            const { userId, lastName, firstName, middleName, birthYear, sportRang } = req.body;
            const createPlayerResult = await applicationService.createPlayer(userId, lastName, firstName, middleName, birthYear, sportRang);
            res.json(createPlayerResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },
    createTeam: async (req, res) => {
        try {
            const { TeamName} = req.body;
            const createTeamResult = await applicationService.createTeam(TeamName);
            res.json(createTeamResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },
    getTeamsPlayer: async (req, res) => {
        try {
            const { applicationId } = req.query;
            const getResult = await applicationService.getTeamsPlayer(applicationId);
            res.json(getResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },
    addPlayerInTeam: async (req, res) => {
        try {
            const {team, player} = req.body;
            const addInTeamResult = await applicationService.addPlayerInTeam(team, player);
            res.json(addInTeamResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },
    cancelApplication: async (req, res) => {
        try {
            const {applicationId} = req.params;
            const { reason } = req.body;
            await TournamentApplications.update({ status: 'отклонено', description: reason }, { where: { application_id: applicationId } });
            res.sendStatus(200); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка при обновлении статуса заявки');
        }
    },
    confirmApplication: async (req, res) => {
        try {
            
            const { applicationId, tournamentId} = req.body;
            const result = await applicationService.confirmApplication(applicationId, tournamentId);
            if (result) {
                res.sendStatus(200);
            } else {
                res.status(500).send('Ошибка при обновлении статуса заявки');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка при обновлении статуса заявки');
        }
    },
    create: async (req, res) => {
        try {
            const { userId, tournamentId, participants} = req.body;

            const user = await User.findOne({ where: { login: userId } });
            const user_Id = user.id;
            const tournament = await Tournament.findOne({ where: { tournament_name: tournamentId } });
            const tournament_Id = tournament.tournament_id;

            const result = await applicationService.create(user_Id, tournament_Id, participants);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },
    getUsersRequest: async (req, res) => {
        try {
            const {userId} = req.params;
            const applications = await applicationService.getUsersRequest(userId);
            res.json(applications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }
};
const { application } = require('express');


const TournamentApplications = require('../context').TournamentApplication;
const Tournaments = require('../context').Tournament;
const ApplicationParticipants = require('../context').ApplicationParticipant;
const TeamApplicationParticipants = require('../context').TeamApplicationParticipant;
const TournamentParticipants = require('../context').TournamentParticipant;
const Player = require('../context').Player;
const User = require('../context').User;
const Team = require('../context').Team;
const TeamMember = require('../context').TeamMember;
    
module.exports = {
    getAllApplications: async () => {
        try {
            const applications = await TournamentApplications.findAll({
                where: {
                    status: 'отправлено'
                },
                include: [
                    { 
                        model: Tournaments,
                        where: {
                            type: 1
                        }
                    },
                    { model: ApplicationParticipants }
                ]
            });
            return applications;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    getAllTeamApplications: async () => {
        try {
            const applications = await TournamentApplications.findAll({
                where: {
                    status: 'отправлено'
                },
                include: [
                    { 
                        model: Tournaments,
                        where: {
                            type: 2
                        }
                    },
                    { model: TeamApplicationParticipants }
                ]
            });
            return applications;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    checkPlayer: async (lastName, firstName, middleName, birthYear) => {
        try {
            const player = await Player.findOne({ where: { LastName: lastName, Name: firstName, MiddleName: middleName, BirthYear: birthYear }});
            if (player) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Internal server error');
        }
    },
    checkTeam: async (TeamName) => {
        try {
            const team = await Team.findOne({ where: { team_name: TeamName }});
            if (team) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Internal server error');
        }
    },
    checkLogin: async (login) => {
        try {
            const user = await User.findOne({ where: { login: login }});
            if (user) {
                return user.id; 
            } else {
                return null; 
            }
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },    
   createPlayer: async (userId, lastName, firstName, middleName, birthYear, sportRang) => {
        try {
            const player = await Player.create({
                user_id: userId,
                LastName: lastName,
                Name: firstName,
                MiddleName: middleName,
                SportRang: sportRang,
                BirthYear: birthYear,
            });
            await player.save();
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    createTeam: async (TeamName) => {
        try {
            const team = await Team.create({
                team_name: TeamName,
            });
            const teamId = team.team_id;
            await team.save();
            return { teamId};
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    addPlayerInTeam: async (teamId, playerId) => {
        try {
            const AddedPlayer = await TeamMember.create({
                team: teamId,
                player: playerId
            });
            await AddedPlayer.save();
            return { AddedPlayer};
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    findPlayerByFullName: async (lastName, firstName, middleName) => {
        try {
          const player = await Player.findOne({
            where: {
              LastName: lastName,
              Name: firstName,
              MiddleName: middleName
            }
          });
          return player.player_id;
        } catch (error) {
          console.error('Error finding player by full name:', error);
          return null;
        }
    },
    getTeamsPlayer: async function (applicationId) {
        try {
            const participants = await TeamApplicationParticipants.findAll({
                where: {
                  application: applicationId,
                }
              });
              const players = [];
              for (const participant of participants) {
                const player = await this.findPlayerByFullName(participant.last_name, participant.first_name, participant.middle_name);
                if (player) {
                  players.push(player);
                }
              }
              return players;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    confirmApplication: async (applicationId, tournamentId) => {
        try {
            const application = await TournamentApplications.findByPk(applicationId, {
                include: [{ model: ApplicationParticipants }]
            }); 
            const participants = application.ApplicationParticipants;

            
            const playerIds = [];
    
            for (const participant of participants) {
                const player = await Player.findOne({ where: { Name: participant.first_name, LastName: participant.last_name, MiddleName:participant.middle_name} });
                if (player) {
                    playerIds.push(player.player_id);
                }
            }
            for (const playerId of playerIds) {
                await TournamentParticipants.create({
                    tournament: tournamentId,
                    player: playerId
                });
            }
            await TournamentApplications.update({ status: 'подтверждено' }, { where: { application_id: applicationId } });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    create: async (user_Id, tournament_Id, participants) => {
        try {
            const app = await TournamentApplications.create({
                tournament_id: tournament_Id,
                application_date: Date.now(),
                user_id:user_Id,
                status: 'отправлено'
            });
            await app.save();

            for (const [index,participant] of participants.entries()) {
                const part = await ApplicationParticipants.create({
                     application: app.application_id,
                     participant_order: index, 
                     last_name: participant.lastName, 
                     first_name: participant.firstName, 
                     middle_name:participant.middleName,
                     birth_year: participant.birthYear,
                     rank: participant.rang,
                     city: participant.city,
                     region: participant.city,
                     coach_name: participant.coachFullName,
                     login: participant.participantLogin
                    });
                    await part.save();
            }
           return app.application_id; 
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    getUsersRequest: async (userId) => {
        try {
            const applications = await TournamentApplications.findAll({
                where: {
                    user_id: userId
                },
                include: [
                    { 
                        model: Tournaments,
                    }
                ]
            });
            return applications;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },    
};

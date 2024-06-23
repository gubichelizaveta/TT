const { Sequelize } = require('../context');
const player = require('../models/player');

const Tournaments = require('../context').Tournament;
const TournamentParticipants = require('../context').TournamentParticipant;
const Player = require('../context').Player;
const Matches = require('../context').Match;
const Team = require('../context').Team;

    
module.exports = {
    getTournamentsMatches: async function (tournamentId) {
        try {
            const matches = await Matches.findAll({
                where: {
                  tournament_id: tournamentId,
                },
                include: [
                    { model: Team, as: 'team1' },
                    { model: Team, as: 'team2' },
                    { model: Player, as: 'player1' },
                    { model: Player, as: 'player2' },
                    { model: Player, as: 'winner' },
                ]
              });
              return matches;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    GenerateMatches: async function (tournamentId) {
        try {
            const participants = await TournamentParticipants.findAll({
                where: {
                    tournament: tournamentId,
                },
                include: [
                    { model: Player}
                ]
            });
    
            
            for (let i = 0; i < participants.length; i++) {
                for (let j = i + 1; j < participants.length; j++) {
                    const participant1 = participants[i];
                    const participant2 = participants[j];
    
                    const match = await Matches.create({
                        tournament_id: tournamentId,
                        match_date: Date.now(),
                        player1_id: participant1.player,
                        player2_id: participant2.player
                    });
                }
            }
            return participants;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    GenerateTeamMatches: async function (tournamentId) {
        try {
            const participants = await TournamentParticipants.findAll({
                where: {
                    tournament: tournamentId,
                },
                include: [
                    { model: Team}
                ]
            });
    
            
            for (let i = 0; i < participants.length; i++) {
                for (let j = i + 1; j < participants.length; j++) {
                    const participant1 = participants[i];
                    const participant2 = participants[j];
    
                    const match = await Matches.create({
                        tournament_id: tournamentId,
                        match_date: Date.now(),
                        team1_id: participant1.team,
                        team2_id: participant2.team
                    });
                }
            }
            return participants;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
    SetResult: async function (matchId, winnerId, score) {
        try {
            const match = await Matches.update({ winner_id: winnerId, score: score }, { where: { match_id: matchId } });
            if (match) return true;
            else false;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },  
    SetTeamResult: async function (matchId, winnerId, score) {
        try {
            const match = await Matches.update({ winnerTeam_id: winnerId, score: score }, { where: { match_id: matchId } });
            if (match) return true;
            else false;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    }, 
    getAll: async function (tournamentId) {
        try {
            const matches = await Matches.findAll({
                where: {
                  tournament_id: tournamentId,
                },
                include: [
                    { model: Team, as: 'team1' },
                    { model: Team, as: 'team2' },
                    { model: Player, as: 'player1' },
                    { model: Player, as: 'player2' },
                    { model: Player, as: 'winner' },
                ]
              });
              return matches;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    }, 
/*     getParticipants: async function (tournamentId) {
        try {
            const participants = await TournamentParticipants.findAll({
                where: {
                    tournament: tournamentId,
                },
                include: [
                    { model: Player}
                ]
            });
            return participants;
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },  */
    getTournamentResult:async function (tournamentId) {
        try {
            const matches = await Matches.findAll({
                where: { tournament_id: tournamentId },
                include: [
                    { model: Player, as: 'player1' },
                    { model: Player, as: 'player2' },
                    { model: Player, as: 'winner' }
                ]
            });

            const playerResults = {};
            matches.forEach(match => {
                const { player1, player2, winner } = match;
                
                if (!playerResults[player1.player_id]) {
                    playerResults[player1.player_id] = {
                        LastName: player1.LastName,
                        Name: player1.Name,
                        MiddleName: player1.MiddleName,
                        points: 0
                    };
                }
                if (!playerResults[player2.player_id]) {
                    playerResults[player2.player_id] = {
                        LastName: player2.LastName,
                        Name: player2.Name,
                        MiddleName: player2.MiddleName,
                        points: 0
                    };
                }
                if (!winner) {
                    return;
                }
                if (winner) {
                    playerResults[winner.player_id].points += 2; 
                }
        
                const loser = winner.player_id === player1.player_id ? player2 : player1;
                playerResults[loser.player_id].points += 1; 
            });
        
            return Object.values(playerResults);
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    }, 
    getTeamResults:async function (tournamentId) {
        try {
            const matches = await Matches.findAll({
                where: { tournament_id: tournamentId },
                include: [
                    { model: Team, as: 'team1' },
                    { model: Team, as: 'team2' },
                    { model: Team, as: 'winnerTeam' }
                ]
            });
            const teamResults = {};
            matches.forEach(match => {
                const { team1, team2, winnerTeam } = match;    
                
              
                if (!teamResults[team1.team_id]) {
                    teamResults[team1.team_id] = {
                        team_name: team1.team_name,
                        points: 0
                    };
                }
                if (!teamResults[team2.team_id]) {
                    teamResults[team2.team_id] = {
                        team_name: team2.team_name,
                        points: 0
                    };
                }
                if (!winnerTeam) {
                    return;
                }
                if (winnerTeam) {
                    teamResults[winnerTeam.team_id].points += 2; 
                }
                const loserTeam = winnerTeam.team_id === team1.team_id ? team2 : team1;
                teamResults[loserTeam.team_id].points += 1; 
            });
            return Object.values(teamResults);
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    }, 
    areAllMatchesPlayed : async (tournamentId) => {
        try {
            const countWin = await Matches.count({
                where: {
                    tournament_id: tournamentId,
                    winner_id: { [Sequelize.Op.gt]: 0 }
                }
            });
            const count = await Matches.count({
                where: {
                    tournament_id: tournamentId                    
                }
            });
            if(countWin != count) {return false; }
            else {return true; }
        } catch (error) {
            console.error('Error checking match status:', error);
            throw error;
        }
    },
    areAllTeamMatchesPlayed : async (tournamentId) => {
        try {
            const countWin = await Matches.count({
                where: {
                    tournament_id: tournamentId,
                    winnerTeam_id:  { [Sequelize.Op.gt]: 0 }
                }
            });
            const count = await Matches.count({
                where: {
                    tournament_id: tournamentId,
                }
            });
            if(countWin != count) {return false; }
            else {return true; }
        } catch (error) {
            console.error('Error checking match status:', error);
            throw error;
        }
    },
    getParticipants: async(tournamentId) => {
        try {
            const part = await TournamentParticipants.findAll({
                where: {
                    tournament: tournamentId,               
                },
                include: [
                    { model: Player },
                    { model: Team }       
                ]
            });
          return part;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    deleteParticipant: async (tournamentId, playerId) => {
        try {
            const participant = await TournamentParticipants.findOne({
                where: {
                    tournament: tournamentId, 
                    player: playerId              
                }
            });
            if (!participant) {
                throw new Error('Participant not found');
            }
            await participant.destroy();
            return true; 
        } catch (error) {
            console.error('Error deleting participant:', error);
            throw error;
        }
    }
};

const Sequelize = require("sequelize");
const config = require("../config.json");
const { noTrueLogging } = require("sequelize/lib/utils/deprecations");

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.options
);


const Role = require('../models/role')(Sequelize, sequelize);
const SportsRang = require('../models/sportsrang')(Sequelize, sequelize);
const User = require('../models/users')(Sequelize, sequelize);
const Player = require('../models/player')(Sequelize, sequelize);
const TournamentType = require('../models/t_type')(Sequelize, sequelize);
const TournamentFormat = require('../models/t_format')(Sequelize, sequelize);
const TournamentLevel = require('../models/t_level')(Sequelize, sequelize);
const Tournament = require('../models/tournament')(Sequelize, sequelize);
const Team = require('../models/team')(Sequelize, sequelize);
const TeamMember = require('../models/teammembers')(Sequelize, sequelize);
const TournamentParticipant = require('../models/t_participant')(Sequelize, sequelize);
const Rating = require('../models/rating')(Sequelize, sequelize);
const StatisticsPl = require('../models/statistics')(Sequelize, sequelize);
const Match = require('../models/match')(Sequelize, sequelize);
const TournamentApplication = require('../models/t_application')(Sequelize, sequelize);
const ApplicationParticipant = require('../models/application_part')(Sequelize, sequelize);
const TeamApplicationParticipant = require('../models/team_application_part')(Sequelize, sequelize);
const News = require('../models/news')(Sequelize,sequelize);

//Определение ассоциаций для модели Roles
Role.hasMany(User, { foreignKey: 'role' });

//Определение ассоциаций для модели Users
User.belongsTo(Role, { foreignKey: 'role' });
User.hasOne(Player, { foreignKey: 'user_id' });

//Определение ассоциаций для модели Players
Player.belongsTo(User, { foreignKey: 'user_id' });
Player.belongsTo(SportsRang, { foreignKey: 'SportRang' });
//Player.hasOne(Rating, { foreignKey: 'player_id'});

//Определение ассоциаций для модели Tournaments
Tournament.belongsTo(TournamentFormat, { foreignKey: 'format' });
Tournament.belongsTo(TournamentLevel, { foreignKey: 'level' });
Tournament.belongsTo(TournamentType, { foreignKey: 'type' });

//Определение ассоциаций для модели Teams
Team.hasMany(TeamMember, { foreignKey: 'team' });

//Определение ассоциаций для модели TeamMembers
TeamMember.belongsTo(Team, { foreignKey: 'team' });
TeamMember.belongsTo(Player, { foreignKey: 'player' });

//Определение ассоциаций для модели TournamentParticipants
TournamentParticipant.belongsTo(Tournament, { foreignKey: 'tournament' });
TournamentParticipant.belongsTo(Player, { foreignKey: 'player' });
TournamentParticipant.belongsTo(Team, { foreignKey: 'team' });

//Определение ассоциаций для модели Matches
Match.belongsTo(Tournament, { foreignKey: 'tournament_id' });
Match.belongsTo(Player, { as: 'player1', foreignKey: 'player1_id' });
Match.belongsTo(Player, { as: 'player2', foreignKey: 'player2_id' });
Match.belongsTo(Team, { as: 'team1', foreignKey: 'team1_id' });
Match.belongsTo(Team, { as: 'team2', foreignKey: 'team2_id' });
Match.belongsTo(Player, { as: 'winner', foreignKey: 'winner_id' });
Match.belongsTo(Team, {as:'winnerTeam', foreignKey: 'winnerTeam_id'});

//Определение ассоциаций для модели Ratings
Rating.belongsTo(Player, { foreignKey: 'player' });

//Определение ассоциаций для модели StatisticsPl
StatisticsPl.belongsTo(Player, { foreignKey: 'player' });

//Определение ассоциаций для модели TournamentApplications
TournamentApplication.belongsTo(Tournament, { foreignKey: 'tournament_id' });
TournamentApplication.belongsTo(User,{ foreignKey: 'user_id' } )
TournamentApplication.hasMany(ApplicationParticipant, { foreignKey: 'application' });
TournamentApplication.hasMany(TeamApplicationParticipant, { foreignKey: 'application' });

//Определение ассоциаций для модели ApplicationParticipants
ApplicationParticipant.belongsTo(TournamentApplication, { foreignKey: 'application' });

TeamApplicationParticipant.belongsTo(TournamentApplication, { foreignKey: 'application' });

async function initializeData() {
  try {
    const rolesCount = await Role.findAndCountAll();
    if (rolesCount === 0) {
      await Role.bulkCreate([
        { role_id:1, name: 'Admin' },
        { role_id:2, name: 'User' },
        { role_id:3, name: 'Player'}
      ]);
    }
    const userCount = await Role.count();
    if (userCount === 0) {
      await User.bulkCreate([
        { id:1, login: 'liza', password: 'ased', role: 1}
      ]);
    }
    const formatCount = await TournamentFormat.count();
    const typeCount = await TournamentType.count();
    const levelCount = await TournamentLevel.count();
    if (formatCount === 0) {
      await TournamentFormat.bulkCreate([
        { name: 'Формат 1' },
        { name: 'Формат 2' },
        // Добавьте другие форматы
      ]);
    }
    
    if (typeCount === 0) {
      await TournamentType.bulkCreate([
        { name: 'Тип 1' },
        { name: 'Тип 2' },
        // Добавьте другие типы
      ]);
    }
    
    if (levelCount === 0) {
      await TournamentLevel.bulkCreate([
        { name: 'Уровень 1' },
        { name: 'Уровень 2' },
        // Добавьте другие уровни
      ]);
    }
  } catch (error) {
    console.error("Error adding initial data:", error);
  }
}  

sequelize.addHook('afterSync', async () => {
  await initializeData();
});
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));

module.exports = {
  Role: Role,
  SportsRang: SportsRang,
  User: User,
  Player: Player,
  TournamentType: TournamentType,
  TournamentFormat: TournamentFormat,
  TournamentLevel: TournamentLevel,
  Tournament: Tournament,
  Team: Team,
  TeamMember: TeamMember,
  TournamentParticipant: TournamentParticipant,
  Rating: Rating,
  StatisticsPl: StatisticsPl,
  Match: Match,
  TournamentApplication: TournamentApplication,
  ApplicationParticipant: ApplicationParticipant,
  TeamApplicationParticipant: TeamApplicationParticipant,
  News: News,
  sequelize,
  Sequelize,
};

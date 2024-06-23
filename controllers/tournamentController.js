const Format = require('../context').TournamentFormat;
const Type = require('../context').TournamentType;
const Level = require('../context').TournamentLevel;
const Tournament = require('../context').Tournament;
const tournamentService = require('../services/tournamentService');

module.exports = {
    getAllFormats: async (req, res, next) => {
      try {
        const formats = await Format.findAll();
        const formattedFormats = formats.map(format => ({ id: format.format_id, name: format.tournament_format_name }));
        res.json(formattedFormats);
      } catch (error) {
        next(error);
      }
    },
  
    getAllTypes: async (req, res, next) => {
      try {
        const types = await Type.findAll();
        const formattedTypes = types.map(type => ({ id: type.type_id, name: type.tournament_type_name }));
        res.json(formattedTypes);
      } catch (error) {
        next(error);
      }
    },
  
    getAllLevels: async (req, res, next) => {
      try {
        const levels = await Level.findAll();
        const formattedLevels = levels.map(level => ({ id: level.level_id, name: level.tournament_level_name }));
        res.json(formattedLevels);
      } catch (error) {
        next(error);
      }
    },
    createTournament: async (req, res, next) => {
      try {
          const { tournament_name, start_date, end_date, number_participants, location, format, type, level } = req.body;
  
         
          if (new Date(start_date) >= new Date(end_date)) {
              throw new Error('Дата начала должна быть раньше даты окончания');
          }
  
          await tournamentService.createTournament(tournament_name, start_date, end_date, number_participants, location, format, type, level);
          res.send(`
              <html>
                  <head>
                      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.6/dist/sweetalert2.min.css">
                  </head>
                  <body>
                      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.6/dist/sweetalert2.min.js"></script>
                      <script>
                          window.onload = function() {
                              Swal.fire({
                                  title: 'Турнир создан!',
                                  icon: 'success',
                                  timer: 1000,
                                  showConfirmButton: false
                              });
                          };
                          window.setTimeout(function() {
                              window.location.href = '/admin/shedule';
                          }, 1000); 
                      </script>
                  </body>
              </html>
          `);
      } catch (error) {
          res.send(`<script>window.location.href = '/admin/shedule'; alert("Форма заполнена неверно: ${error.message}"); </script>`);
      }
  },  
    getAllTournaments: async (req, res, next) => {
      try {
        const tournaments = await Tournament.findAll({
          include: [
              { model: Format },
              { model: Type },
              { model: Level }
          ]
      });
        res.json(tournaments);
      } catch (error) {
        next(error);
      }
    },
    getSingleTournaments: async (req,res,next) => {
      try {
          const tournaments = await Tournament.findAll({
              where: {
                  type: 1
              },
              include: [
                { model: Format },
                { model: Type },
                { model: Level }
            ]
          });
          res.json(tournaments);
      } catch (error) {
        next(error);
      }
  },
  getCommandTournaments: async (req,res,next) => {
    try {
        const tournaments = await Tournament.findAll({
            where: {
                type: 2
            },
            include: [
              { model: Format },
              { model: Type },
              { model: Level }
          ]
        });
        res.json(tournaments);
    } catch (error) {
      next(error);
    }
},
getDate: async (req,res,next) => {
  const { tournament_id } = req.params;
  try {
      const date = await Tournament.findAll({
          where: {
              tournament_id: tournament_id
          },
          attributes: ['start_date', 'end_date']
      });
      res.json(date);
  } catch (error) {
    next(error);
  }
},
  deleteTournament: async (req, res, next) => {
      try {
          const { tournament_id } = req.params;
          const deletedTournament = await Tournament.destroy({ where: { tournament_id } });
          if (deletedTournament) {
              res.sendStatus(200);
          } else {
              res.sendStatus(404);
          }
      } catch (error) {
          next(error);
      }
  }
  };
  

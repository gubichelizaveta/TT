
const newsService = require('../services/newsService');


module.exports = {
    getAll: async (req, res) => {
        try {
            const news = await newsService.getAll();
            res.json(news);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    getLastNews: async (req, res) => {
        try {
            const news = await newsService.getLastNews();
            res.json(news);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    getOneNew: async (req, res) => {
        try {
            const {newsId} = req.params;
            const news = await newsService.getOneNew(newsId);
            res.json(news);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    createNew: async (req, res, next) => {
        try {
            const { title, subtitle,imageUrl, Category} = req.body;
            await newsService.createNew(title,subtitle,imageUrl,Category);
            res.send(`
              <html>
                <head>
                  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.6/dist/sweetalert2.min.css">
                </head>
                <body>
                  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.6/dist/sweetalert2.min.js"></script>
                  <script>
                    window.onload = function() {
                    Swal.fire({title: 'новость создана! ',icon: 'success',timer: 1000, showConfirmButton: false});
                    };
                  window.setTimeout(function() {
                  window.location.href = '/admin/news';
                  }, 1000); 
                  </script>
                </body>
              </html>
          `);
        } catch (error) {
            res.send(`<script>window.location.href = '/admin/news'; alert("форма заполнена неверно"); </script>`);
       
        }
    }
};
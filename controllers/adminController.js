const statistics = require("../models/statistics");

const adminController = {
    dashboard: (req, res) => {
        res.sendFile('./views/adminPanel.html');
    },
    shedule: (req, res) => {
        res.sendFile('./views/ShedulePage.html');
    },
    application: (req, res) => {
        res.sendFile('C:\\Users\\Liza\\Desktop\\lw7\\views\\ApplicationPage.html');
    },
    ratingAll: (req,res) => {
        res.sendFile('C:\\Users\\Liza\\Desktop\\lw7\\views\\RatingAllPage.html');
    },
    ratingAdd: (req,res) => {
        res.sendFile('C:\\Users\\Liza\\Desktop\\lw7\\views\\RatingAddPage.html');
    },
    statistics: (req,res) => {
        res.sendFile('C:\\Users\\Liza\\Desktop\\lw7\\views\\StatisticsPage.html');
    },
    matches: (req,res) => {
        res.sendFile('C:\\Users\\Liza\\Desktop\\lw7\\views\\MatchesPage.html');
    },
    news: (req,res) => {
        res.sendFile('C:\\Users\\Liza\\Desktop\\lw7\\views\\NewsPage.html');
    },
    result: (req,res) => {
        res.sendFile('C:\\Users\\Liza\\Desktop\\lw7\\views\\ResultPage.html');
    }
};
module.exports = adminController;

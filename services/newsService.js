const news = require('../models/news');

const News= require('../context').News;


module.exports = {
    getAll: async () => {
        try {
            const news = await News.findAll({});
            return news;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    getLastNews: async (UserId) => {
        try {
            const news = await News.findAll({
                limit: 3,
                order: [['createdAt', 'DESC']],
              });
            return news;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    getOneNew: async (newsId) => {
        try {
            const news = await News.findAll({
                where: {
                    news_id: newsId
                }
            });
            return news;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    createNew: async (title,subtitle,imageUrl,Category) => {
        const news = await News.create({
            title: title,
            content: subtitle,
            category: Category,
            image_url: imageUrl
        });
        await news.save();
        return news;
    }
};

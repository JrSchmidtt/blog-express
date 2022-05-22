const Sequelize = require('sequelize');
const connection = new Sequelize('blog-express','root','',{
    host:'localhost',
    dialect:'mysql',
    timezone: '-03:00'
});

module.exports = connection;
const Sequelize = require('sequelize');
const connection = new Sequelize('blog-express','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;
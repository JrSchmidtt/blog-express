const Sequelize = require('sequelize');
const connection = new Sequelize('blog-express','root','0808',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;
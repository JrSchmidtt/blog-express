const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../categories/Category')

const Article = connection.define('article',{ 
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

Category.hasMany(Article); // A Category has many articles
Article.belongsTo(Category); // An article belongs to a category

Article.sync({force:false});

module.exports = Article;
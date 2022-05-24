const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const session = require('express-session');

const categoriesController = require('./categories/CategoriesController');
const articlesContoller = require('./articles/ArticlesController')
const usersController = require('./users/UsersController')

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User')

// View Engine
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: '!@&l#umsKIgqI$XLViBaF^8$FS#mlpNJ@@*SZ5pjRfArrfBDrQ',
    cookie: {maxAge: 300000000}, // tempo maximo da sessão em 30 segundos
    resave: true,
    saveUninitialized: true
}))

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles:articles, categories:categories});
        })
    });
})

// Routers
app.use('/',categoriesController);
app.use('/',articlesContoller);
app.use('/',usersController);


app.get('/category/:slug', (req, res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug:slug
        },
        include: [{model:Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render('index', {articles:category.articles, categories:categories});
            })
        }else{
            res.redirect('/');
        }
    }).catch(err =>{
        res.redirect('/');
    })
})

app.get('/:slug', (req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article', {article:article, categories:categories});
            })
        }else{
            res.redirect('/');
        }
    }).catch(err =>{
        res.redirect('/');
    })
})

// database MYSQL
connection
    .authenticate()
    .then(() => {
        console.log('Banco de Dados conectado com SUCESSO!')
    }).catch((error) =>{
        console.log(error);
    })

app.listen(8080,() =>{
    console.log('SERVER START !');
})
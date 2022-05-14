const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');

const categoriesController = require('./categories/CategoriesController');
const articlesContoller = require('./articles/ArticlesController')

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.render('index');
})

// Routers
app.use('/',categoriesController);
app.use('/',articlesContoller);

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
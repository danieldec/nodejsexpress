'use strict'

const express = require('express');
const hbs = require('express-handlebars');
const api = require('./routes');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use('/api', api);
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/',(req,res)=>{
    res.render('products');
});

module.exports = app;
const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cors = require('cors');
const nunjucks = require('nunjucks');
const reload = require('reload');   
const config = require('./configs/config');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const app = express();

//Configure session with knex
const store = new KnexSessionStore({
    tablename: 'sessions',
    knex: config.knex,
    createtable: true,
    clearInterval: 60000
}); 

// session store config
app.use(session({
    store: store,
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 60000
    }
}));

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

// use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('/public/'));

app.use(validator({
    customValidators: {
        isValiddmyDate: function (value) {
            var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
            return pattern.test(value)
        }
    }
}));

// use template engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
// set njk as default
app.set('view engine', 'njk');

// Use knex as middleware and set global viewData
app.use((req, res, next) => {
    if(!req.db){
        req.db = config.knex;
    }
    
    if(!req.viewData){
        req.viewData = {};
        req.viewData.baseUrl = process.env.SITE_HOST+':'+SITE_PORT
    }

    next();
})

app.use((req, res, next) =>{
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// use router
const admin = require('./routes/admin');
const api = require('./routes/api');

app.use('/admin', admin);
app.use('/api', api);

app.get('/', function (req, res) {
    res.render('login', req.viewData);
});

const SITE_PORT = process.env.SITE_PORT || 9000;
const SITE_HOST = process.env.SITE_HOST || 'http://localhost';

reload(app);

app.listen(SITE_PORT, () => {
    console.log('Site running on ' + SITE_HOST + ':' + SITE_PORT)
});

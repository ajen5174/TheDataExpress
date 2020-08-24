const express = require('express'),
    expressSession = require('express-session');
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser('This is my passphrase'));

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(expressSession({
    secret: 'whatever',
    saveUninitialized: true,
    resave: true
}));

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/', routes.login);
app.get('/signup', routes.signup);
app.post('/signup', urlencodedParser, routes.signupPost);
app.get('/login', routes.login);
app.post('/login', urlencodedParser, routes.loggedIn);
app.get('/profile', checkAuth, routes.profile);

app.get('/logout', routes.logout);

app.listen(3000);

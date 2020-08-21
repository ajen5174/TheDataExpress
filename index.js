const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

let urlendcodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', routes.index);
app.get('/signup', routes.signup);
app.post('/signup', urlendcodedParser, routes.signupPost);
app.get('/profile', routes.profile);

app.listen(3000);

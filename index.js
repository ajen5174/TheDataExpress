const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', routes.index);


app.listen(3000);

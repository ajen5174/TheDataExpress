const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/data', {useUnifiedTopology: true, useNewUrlParser: true});

let mdb = mongoose.connection;

mdb.on('error', console.error.bind(console, 'connection error: '));
mdb.once('open', callback => {

});

exports.index = (req, res) => {
    res.cookie('lastTimeVisited', Date.now(), {maxAge: 999999999999});
    res.render('index', {
        title: 'Home page'
    })
};

exports.signup = (req, res) => {
    res.render('signup', {
        title: 'Sign up'
    })
}

exports.signupPost = (req, res) => {
    console.log(req.body.username);

    res.redirect('/');
}
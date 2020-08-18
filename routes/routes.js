const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/data', {useUnifiedTopology: true, useNewUrlParser: true});

let mdb = mongoose.connection;

mdb.on('error', console.error.bind(console, 'connection error: '));
mdb.once('open', callback => {

});

exports.index = (req, res) => {
    res.render('index', {
        title: 'Home page'
    })
};

exports.profile =(req, res) => {

    profile = {
        username: "user",
        password: "pass",
        email: "",
    };
    
    res.render('profile', {
        title: 'Profile Page'
    })
}

exports.signup = (req, res) => {
    res.render('signup', {
        title: 'Sign up'
    })
}

exports.signupPost = (req, res) => {
    console.log(req.body.username);

    res.redirect('/');
}
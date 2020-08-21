const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Dict = require("collections/dict");

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
        email: "This@email.com",
        age: 24,
        securityQuestions:  new Dict({
            ["What is your favorite color?"]: "red",
            ["What is your favorite animal?"]: "buffalo",
            ["What is your mother's maiden name?"]: "woman"
        })
    };

    console.log(typeof securityQuestions);
    
    res.render('profile', {
        title: 'Profile Page',
        profile
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
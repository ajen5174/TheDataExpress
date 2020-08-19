const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://testUser:testUserPassword@cluster0.ktyj8.mongodb.net/data_express?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true});

let mdb = mongoose.connection;

mdb.on('error', console.error.bind(console, 'connection error: '));
mdb.once('open', callback => {

});

let accountSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    answerOne: String,
    answerTwo: String,
    answerThree: String
});

let Account = mongoose.model('accounts', accountSchema);

exports.index = (req, res) => {
    res.cookie('lastTimeVisited', Date.now(), {maxAge: 999999999999});
    res.render('index', {
        title: 'Home page'
    })
};

exports.profile = (req, res) => {

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
    });
}

exports.signupPost = (req, res) => {
    var pass = null
    bcrypt.genSaltSync(10, function(err, salt){
        if (err) return next(err);
        bcrypt.hashSync(req.body.password, salt, null, function(err, hash){
            if (err) return next(err);
            pass = hash;
            next(err);
        })
    });

    let account = new Account({
        username: req.body.username,
        password: pass,
        email: req.body.email,
        age: req.body.age,
        answerOne: req.body.answerOne,
        answerTwo: req.body.answerTwo,
        answerThree: req.body.answerThree
    });

    account.save((err, account) => {
        if(err) return console.error(err);
        console.log(req.body.username + "'s account created")
    });

    req.session.user = {
        isAuthenticated: true,
        username: req.body.username
    }

    res.redirect('/profile');
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}
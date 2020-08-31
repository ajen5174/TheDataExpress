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

let salt = bcrypt.genSaltSync(10);

exports.api = (req, res) => {
    let results = {
        answerOne: {Dog: 0, Cat: 0, Turtle: 0, Buffalo: 0},
        answerTwo: {Pizza: 0, Hamburgers: 0, Tacos: 0, 'Chicken Sandwich': 0},
        answerThree: {Red: 0, Blue: 0, Yellow: 0, Green: 0}
    }
    Account.find((err, people) => {
        console.log(people);
        people.forEach((person, index) => {
            results.answerOne[person.answerOne]++;
            results.answerTwo[person.answerTwo]++;
            results.answerThree[person.answerThree]++;
        });
        res.json(results);
    });

    

};

exports.profile = (req, res) => {

    let current = new Date();
    let date = current.getDate();
    let month = current.getMonth();
    let year = current.getFullYear();
    let hours = current.getHours();
    let minutes = current.getMinutes();
    let ampm = "AM";

    if(minutes < 10)
    {
        minutes = "0" + minutes;
    }
    if(hours == 0)
    {
        hours = 12;
    } else if (hours == 12){
        ampm = "PM";
    } else if(hours > 12)
    {
        hours -= 12;
        ampm = "PM";
    }

    res.cookie('lastTimeVisited', (month+1) + '/' + date + '/' + year + " at " + hours + ':' + minutes + ampm, {maxAge: 999999999999});

    Account.findOne({username: req.session.user.username}, (err, person) => {
        console.log(person.username + " " + person.answerThree);
        res.render('profile', {
            person,
            cookieInfo: req.cookies.lastTimeVisited
        })
    });
    
}

exports.signup = (req, res) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        res.redirect('/profile');
    }
    else{
        res.render('signup', {
        });
    }
    
}

exports.signupPost = (req, res) => {
    var pass = null;
    let hash = bcrypt.hashSync(req.body.password, salt);

    pass = hash;

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

exports.login = (req, res) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        console.log('logged in');
        res.redirect('/profile');
    } else {
        res.render('login',  {
            title: "Login"
        });
    }
    
};

exports.loggedIn = (req, res) => {
    Account.findOne({username: req.body.username}, (err, account) => {
        if(bcrypt.compareSync(req.body.password, account.password))
        {
            console.log('login success');
            req.session.user = {
                isAuthenticated: true,
                username: req.body.username
            }
            res.redirect('/profile');
        }
        else {
            res.redirect('/');
        }
    });

};

exports.update = (req, res) => {
    Account.findOne({username: req.session.user.username}, (err, person) => {
        console.log(person.username + " " + person.answerThree);
        res.render('update', {
            title: 'Update Page',
            person
        })
    });
};

exports.updateInfo = (req, res) => {
    console.log("update submitted");
    Account.findOne({username: req.session.user.username}, (err, person) => {
        person.email = req.body.email;
        person.age = req.body.age;
        person.answerOne = req.body.answerOne;
        person.answerTwo = req.body.answerTwo;
        person.answerThree = req.body.answerThree;
        person.save((err, account) => {
            if(err) return console.error(err);
            console.log(req.body.username + "'s account updated")
        });

        console.log(person.username + " " + person.answerThree);
        res.redirect('/profile');
    });
};


exports.home = (req, res) => {
    res.render('index', {
        title: 'Home Page' 
    });
};



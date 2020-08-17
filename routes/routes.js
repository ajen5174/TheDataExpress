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
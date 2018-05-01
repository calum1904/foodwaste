const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const routes = require('./routes/api');

const app = express();

mongoose.connect('mongodb://admin:admin@ds121349.mlab.com:21349/foodwaste');
mongoose.Promise = global.Promise;

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname + '/views/layouts/'),
    partialsDir: path.join(__dirname + '/views/layouts/partials')
}));


app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

app.use('/api', require('./routes/api'));

app.use(function(err, req, res, next) {

    res.status(422).send({ error: err.message });

});

app.listen(process.env.PORT || 4000, function() {
    console.log('Port is now listening');
});

module.exports = app;
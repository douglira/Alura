var app = require('express')(),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator')();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator);

consign()
    .include('controllers')
    .into(app);

module.exports = function () {
    return app;
};


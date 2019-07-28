const express = require('express'),
    app = express(),
    consign = require('consign'),
    bodyParser = require('body-parser');

/*
* Configurando uma variável de ambiente do Express para
* realizar as autenticações com JSON Web Token.
* */
app.set('secret', 'aiquegostoso');

app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd: 'app'}) /*CWD: Diretório de trabalho atual (Current work directory)*/
    .include('models')
    .then('api')
    .then('routes/auth.js') /*A rota de autenticação deve ser carregada primeiro do que as outras*/
    .then('routes')
    .into(app);

module.exports = app;


var http = require('http'),
    app = require('./config/express');

require('./config/database')('localhost/alurapic');

http.createServer(app)
    .listen(3000, function () {
        console.log('Servidor rodando na porta 3000');
    });
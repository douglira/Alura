let winston = require('winston'),
    fs = require('fs');

/*
* Cria a pasta Logs caso ela não exista
* */
if(!fs.existsSync('logs')){
    fs.mkdirSync('logs');
}

/*
* Configurando nosso arquivo e diretório de Logs
* */
module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/paysfast.log',
            maxsize: 100000,
            maxFiles: 10,
            colorize: true
        })
    ]
});

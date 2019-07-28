var mysql = require('mysql');

function createDBConnection() {

    if (!process.env.NODE_ENV) {

        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV == 'test') {

        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs_test'
        });
    }


}

/* OBS.(WRAPPER: A função que cria a conexão só será chamada quando
        um outro módulo fizer uma chamada à este módulo e não quando
        o servidor carregar todos os módulos.) */
module.exports = function() {

    return createDBConnection;
}
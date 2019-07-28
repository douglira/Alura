/*
* Utilizando o package RESTIFY-CLIENTS para se comunicar com uma outra
* API REST a partir da nossa API REST(REST to REST).*/
let restify = require('restify-clients');

function ClientCartoes() {

    /*
    * Criando um objeto client e configurando a API
    * que será consultada através da propriedade URL
    * */
    this._client = restify.createJsonClient({
        url: 'http://localhost:3001'
    });
}

ClientCartoes.prototype.autoriza = function (cartao, callback) {

    /*
    * Realizando um POST para a API
    * */
    this._client.post('/cartoes/autoriza', cartao, callback);
};

module.exports = function () {
    return ClientCartoes;
};

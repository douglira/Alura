/*
* Utilizando o package SOAP para se comunicar com uma Web Service SOAP
* e utilizar seus métodos disponíveis
* */
let soap = require('soap');

function CorreiosSOAPClient() {

    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.calculaPrazo = function (dadosDeEntrega, callback) {

    /*
    * Criando um SOAP Client para a utilização
    * */
    soap.createClient(this._url, function (err, client) {

        /*
        * O parâmetro CLIENT nos devolve todos os métodos
        * diponíveis no WSDL do Web Service SOAP
        * */
        client.CalcPrazo(dadosDeEntrega, callback)
    });
};

module.exports = function () {
    return CorreiosSOAPClient;
};
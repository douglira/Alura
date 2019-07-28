System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacoes;
    return {
        setters: [],
        execute: function () {
            Negociacoes = class Negociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                getLista() {
                    return [].concat(this._negociacoes);
                }
                volumeTotal() {
                    return this._negociacoes.reduce((total, ponteiro) => total + ponteiro.volume, 0.0);
                }
                paraTexto() {
                    console.log('IMPRESSÃO');
                    console.log(JSON.stringify(this._negociacoes));
                }
                equals(negociacoes) {
                    return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.getLista());
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});

System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacao, DiaDaSemana;
    return {
        setters: [],
        execute: function () {
            Negociacao = class Negociacao {
                constructor(data, quantidade, valor) {
                    this.data = data;
                    this.quantidade = quantidade;
                    this.valor = valor;
                }
                get volume() {
                    return this.quantidade * this.valor;
                }
                ehDiaUtil() {
                    return this.data.getDay() != DiaDaSemana.Domingo && this.data.getDay() != DiaDaSemana.Sábado;
                }
                paraTexto() {
                    console.log('IMPRESSÃO');
                    console.log(`
        DATA: ${this.data}
        QUANTIDADE: ${this.quantidade}
        VALOR: ${this.valor}
        VOLUME: ${this.volume}
        `);
                }
                equals(negociacao) {
                    return this.data.getDate() == negociacao.data.getDate()
                        && this.data.getMonth() == negociacao.data.getMonth()
                        && this.data.getFullYear() == negociacao.data.getFullYear();
                }
            };
            exports_1("Negociacao", Negociacao);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Ter\u00E7a"] = 2] = "Ter\u00E7a";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["S\u00E1bado"] = 6] = "S\u00E1bado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});

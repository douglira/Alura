"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Negociacao", Negociacao = function () {
                function Negociacao(data, quantidade, valor) {
                    _classCallCheck(this, Negociacao);

                    this._data = new Date(data.getTime());
                    /* O método getTime() retorna um número long na qual podemos passar pelo construtor do Date
                     * criando assim uma nova referência dentro da nossa classe com a mesma data, fazendo com que 
                     * ela seja imutável fora da classe. Pois os objetos da classe Date possuem métodos Setters, 
                     * desse modo os Setters irão modificar uma nova referência que é instanciada pelo Getter desta classe.
                     */
                    this._quantidade = quantidade;
                    this._valor = valor;
                    Object.freeze(this);
                    /* Este método impede que os atributos sejam alterados diretamente
                     * possibilitando o "encapsulamento" destes atributos
                     */
                }

                /* O UNDERLINE (_) é uma convenção no JavaScript que encapsula seus atributos dizendo
                 * que apenas os métodos de acesso da classe podem alterar seus próprios atributos.
                 */

                _createClass(Negociacao, [{
                    key: "isEquals",
                    value: function isEquals(outraNegociacao) {
                        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
                    }
                }, {
                    key: "volume",
                    get: function get() {
                        return this._quantidade * this._valor;
                    }
                }, {
                    key: "data",
                    get: function get() {
                        return new Date(this._data.getTime());
                    }
                }, {
                    key: "quantidade",
                    get: function get() {
                        return this._quantidade;
                    }
                }, {
                    key: "valor",
                    get: function get() {
                        return this._valor;
                    }
                }]);

                return Negociacao;
            }());

            _export("Negociacao", Negociacao);
        }
    };
});
//# sourceMappingURL=Negociacao.js.map
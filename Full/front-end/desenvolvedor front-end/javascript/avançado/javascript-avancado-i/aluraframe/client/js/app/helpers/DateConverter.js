'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateConverter;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

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

            _export('DateConverter', DateConverter = function () {
                function DateConverter() {
                    _classCallCheck(this, DateConverter);

                    throw new Error('Esta classe não pode ser instanciada');
                }

                _createClass(DateConverter, null, [{
                    key: 'dataParaTexto',
                    value: function dataParaTexto(data) {
                        //TEMPLATE STRING é utilizado com um BACKSTICK(CRASE);
                        return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                        // return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                    }
                }, {
                    key: 'textoParaData',
                    value: function textoParaData(texto) {

                        if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('Formato da data deve ser: aaaa-mm-dd');

                        /* 
                         * SPREAD OPERATOR: Reticencias (...) desmenbra o array transformando cada posição
                         * em um parâmetro do construtor Date();
                         */

                        //Arrow Function que omite a palavra FUNCTION, a RETURN  e as CHAVES {};
                        //A % é um cálculo modular do JavaScript que retorna o RESTO de uma DIVISÃO;
                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (item, indice) {
                            return item - indice % 2;
                        })))))();
                    }
                }]);

                return DateConverter;
            }());

            _export('DateConverter', DateConverter);
        }
    };
});
//# sourceMappingURL=DateConverter.js.map
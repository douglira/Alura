'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDAO', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDAO, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDAO) {
            NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'cadastrar',
                    value: function cadastrar(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociacao adicionada com sucesso.';
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'obterNegociacoes',
                    value: function obterNegociacoes() {

                        return Promise.all([this._obterNegociacoesDaSemana(), this._obterNegociacoesDaSemanaAnterior(), this._obterNegociacoesDaSemanaRetrasada()]).then(function (arrayDeNegociacoes) {
                            return arrayDeNegociacoes.reduce(function (flatArray, array) {
                                return flatArray.concat(array);
                            }, []);
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(listaAtual) {

                        return this.obterNegociacoes().then(function (negociacoesService) {
                            return negociacoesService.filter(function (negociacaoService) {
                                return !listaAtual.some(function (negociacaoLista) {
                                    return negociacaoService.isEquals(negociacaoLista);
                                });
                            });
                        });
                    }
                }, {
                    key: '_obterNegociacoesDaSemana',
                    value: function _obterNegociacoesDaSemana() {

                        //Retorna a instância da Promise criada na HttpService
                        return this._http.get('negociacoes/semana').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (erro) {
                            throw new Error('Não foi possível importar as negociações da semana.');
                        });
                    }
                }, {
                    key: '_obterNegociacoesDaSemanaAnterior',
                    value: function _obterNegociacoesDaSemanaAnterior() {

                        return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (erro) {
                            throw new Error('Não foi possível importar as negociações da semana anterior.');
                        });
                    }
                }, {
                    key: '_obterNegociacoesDaSemanaRetrasada',
                    value: function _obterNegociacoesDaSemanaRetrasada() {

                        return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (erro) {
                            throw new Error('Não foi possível importar as negociações da retrasada.');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map
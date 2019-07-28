'use strict';

System.register(['../models/ListaNegociacoes', '../models/Mensagem', '../models/Negociacao', '../views/MensagemView', '../views/NegociacoesView', '../services/NegociacaoService', '../helpers/Bind', '../helpers/DateConverter'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, Negociacao, MensagemView, NegociacoesView, NegociacaoService, Bind, DateConverter, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_helpersDateConverter) {
            DateConverter = _helpersDateConverter.DateConverter;
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    //Cria um CACHE no construtor evitando que busque toda vez os elementos do DOM ao chamar o método adiciona()
                    var $ = document.querySelector.bind(document);

                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    //Classe Bind retorna a Instância de um Proxy
                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    this._negociacaoService = new NegociacaoService();

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

                    this._ordemAtual = '';

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._negociacaoService.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            return _this.importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._negociacaoService.cadastrar(negociacao).then(function (mensagem) {

                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            //Setter da mensagem para ser exibida
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        /* ------------------ PROMISE PATTERN RESOLUTION --------------------- */

                        /* OBS.(Utilizamos o método estático all() da classe PROMISE na qual recebe como parâmetro um
                                array de objetos Promise. Desta maneira as Promises (que neste caso são execuções
                                de requisições assíncronas do AJAX) são executadas na ordem (ou em sincronia) dentro 
                                deste array. Cada execução dos objetos Promise retornam uma função RESOLVE(executada no THEN) 
                                e um REJECT(executada no CATCH). No THEN, se for executado todos os RESOLVE, irá formar
                                um Array de Array's onde cada array dentro da array possue objetos Negociação.
                                Usamos o REDUCE para formar um Array com todos os objetos Negociação, ou seja, os
                                objetos Negociacao de cada Array foram tranferidos para esta nova Array(flatArray).
                                Com o FOREACH adicionamos todos os objetos da flatArray). */

                        this._negociacaoService.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this3._listaNegociacoes.adiciona(negociacao);
                            });
                            _this3._mensagem.texto = 'Negociacoes do período importadas com sucesso.';
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });

                        /* 
                            ------------CALLBACK RESOLUTION--------------------------
                              OBS.(Este modelo de implementação para esta situação 
                                se tornou muito verboso,pois repetimos muitas vezes 
                                a utilização de ERROR-FIRST ocasionando uma cadeia de if's
                                e callback's consecutivos (CALLBACK HELL) para sincronizar
                                as requisiçoes assíncronas do AJAX formando assim, esta pirâmide 
                                de código (Pyramid of Doom))
                                  let service = new NegociacaoService();
                        
                            service.obterNegociacoesDaSemana((erro, negociacoes) => {
                              if (erro) {
                                  this._mensagem.texto = erro;
                                return
                            }
                              negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao) });
                              service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
                                  if (erro) {
                                      this._mensagem.texto = erro;
                                    return
                                }
                                  negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao) });
                                  service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                                      if (erro) {
                                          this._mensagem.texto = erro;
                                        return
                                    }
                                      negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao) });
                                    this._mensagem.texto = 'Negociações importadas com sucesso.';
                                });
                            });
                        }); */
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {

                        if (this._ordemAtual == coluna) {

                            this._listaNegociacoes.inverteOrdem();
                            this._ordemAtual = '';
                        } else {

                            this._listaNegociacoes.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                            this._ordemAtual = coluna;
                        }
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this4 = this;

                        this._negociacaoService.apaga().then(function (mensagem) {

                            _this4._mensagem.texto = mensagem;
                            _this4._listaNegociacoes.esvazia();
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {

                        return new Negociacao(DateConverter.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {

                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {

                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map
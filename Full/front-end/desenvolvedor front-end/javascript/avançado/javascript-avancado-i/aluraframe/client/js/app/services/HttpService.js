'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

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

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: '_handleErrors',
                    value: function _handleErrors(resp) {

                        if (!resp.ok) throw new Error(resp.statusText);
                        return resp;
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        /* OBS.(A variável global FETCH pertence à uma API do JavaScript que trabalha automaticamente
                                com as requisições AJAX e retorna uma Promise, sendo assim, podendo capturar sua
                                resposta no THEN(). Para tratativa de erros temos o RESP.OK que seria o status da
                                requisição que retorna um boolean TRUE(200<=status<300), caso retorne FALSE 
                                lançamos um Error para que seja pego pelo CATCH na NegociacaoService) */
                        return fetch(url).then(function (resp) {
                            return _this._handleErrors(resp);
                        }).then(function (resp) {
                            return resp.json();
                        });

                        /* return new Promise((resolve, reject) => {
                              let xhr = new XMLHttpRequest();
                              //Método da requisição e o endereço do servidor
                            xhr.open('GET', url);
                              //Obter os dados do servidor no estado onde a resposta é enviada pelo servidor
                            //ESTADOS:
                              // 0: requisição ainda não iniciada
                            // 1: conexão com o servidor estabelecida
                            // 2: requisição recebida
                            // 3: processando requisição
                            // 4: requisição está concluída e a resposta está pronta (ESTADO DE RESPOSTA DO SERVIDOR NA REQUISIÇÃO AJAX)
                              //Executa a função que implementamos no estado de resposta do servidor. STATE 4
                            xhr.onreadystatechange = () => {
                                  if (xhr.readyState == 4) {
                                      //Obtemos a resposta apenas se a conexão for OK(200)
                                    if (xhr.status == 200) {
                                          resolve(JSON.parse(xhr.responseText));
                                    } else {
                                          reject(xhr.response);
                                        console.log(xhr.response);
                                    }
                                }
                            }
                              xhr.send();
                        }) */
                    }
                }, {
                    key: 'post',
                    value: function post(url, dado) {
                        var _this2 = this;

                        /* OBS.(O segundo parâmetro do FETCH é um objeto JavaScript na qual configuramos
                                seus "atributos" HEADERS, METHOD e BODY para que possamos realizar um POST.) */
                        return fetch(url, {
                            headers: { 'Content-type': 'application/json' },
                            method: 'post',
                            body: JSON.stringify(dado)
                        }).then(function (resp) {
                            return _this2._handleErrors(resp);
                        });

                        /* return new Promise((resolve, reject) => {
                              let xhr = new XMLHttpRequest();
                            xhr.open("POST", url, true);
                            // Para se realizar um POST é necessário informar ao cabeçalho(HEADER)
                            // o conteúdo do dado (CONTENT-TYPE) e seu respectivo tipo(Neste caso:
                            // 'application/json') 
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.onreadystatechange = () => {
                                  if (xhr.readyState == 4) {
                                      if (xhr.status == 200) {
                                          resolve(JSON.parse(xhr.responseText));
                                    } else {
                                          reject(xhr.responseText);
                                    }
                                }
                            };
                            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
                        }); */
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map
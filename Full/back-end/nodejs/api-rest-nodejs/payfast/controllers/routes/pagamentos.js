/*
* ----------- curl para teste ------------------
* curl http://localhost:3000/pagamentos/pagamento -XPOST -v -H "Content-type: application/json" -d @files/pagamento.json | json_pp
* */

module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {

        console.log('Requisição atendida com sucesso.');
        res.send('Tudo OK.')
    });

    app.get('/pagamentos/pagamento/:id', function (req, res) {

        let id = req.params.id,
            pagamento = {};

        new app.services.memcachedClient().get(`pagamento-${id}`, function (cacheErr, cacheResult) {

            /*
            * Consultando no Banco de Dados caso haja erro ou ache vazia
            * */
            if (cacheErr || !cacheResult) {

                console.log('Consultando do BANCO pagamento: ' + id);
                console.log('MISS - chave não encontrada.');

                new app.persistence.PagamentoDAO(app.persistence.connectionFactory())
                    .consulta(id, function (err, result) {

                        if (err) {

                            console.log('Erro BD na consulta: ' + err);
                            res.status(500).send(err);
                            return;
                        }

                        /*
                        * Enviando consulta feita no BD
                        * */
                        pagamento = result;
                        res.json(pagamento);
                    });
            } else {

                console.log('Consultando do CACHE pagamento: ' + id);
                console.log('HIT - valor: ' + JSON.stringify(cacheResult));
                /*
                * Enviando consulta feita no CACHE
                * */
                pagamento = cacheResult;
                res.json(pagamento);
            }
        });
    });

    app.delete('/pagamentos/pagamento/:id', function (req, res) {

        let pagamento = {},
            connection = app.persistence.connectionFactory(),
            pagamentoDAO = new app.persistence.PagamentoDAO(connection);

        pagamento.id = req.params.id;
        pagamento.status = 'CANCELADO';

        pagamentoDAO.atualiza(pagamento, function (err, result) {

            if (err) {

                console.log('Erro de cancelamento: ' + err);
                res.status(500).send(err);
                return;
            }

            console.log('Pagamento cancelado');
            res.status(204).send(pagamento);
        });
    });

    app.put('/pagamentos/pagamento/:id', function (req, res) {

        /*
        * Acessando o parâmetro ID da URL
        * */
        let pagamento = {},
            connection = app.persistence.connectionFactory(),
            pagamentoDAO = new app.persistence.PagamentoDAO(connection);

        pagamento.id = req.params.id;
        pagamento.status = 'CONFIRMADO';

        pagamentoDAO.atualiza(pagamento, function (err, result) {

            if (err) {

                console.log('Erro de update: ' + err);
                res.status(500).send(err);
                return;
            }

            console.log('Pagamento confirmado');
            res.send(pagamento);
        });

    });

    app.post('/pagamentos/pagamento', function (req, res) {

        /*
        * Validando a requisição logo de início.
        * Utilizando a lib ASSERT do Express para validações, mas
        * para que ela possa ser utilizada nas requisições é necessário
        * a instalação do pacote Express Validator.
        * */
        req.assert('pagamento.forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
        req.assert('pagamento.valor', 'Valor é obrigatório e deve ser numérico').notEmpty().isFloat();

        /*
        * validationErrors(): Outro método agregado as requisições
        * através do Express Validator
        * */
        if (req.validationErrors()) {

            /*
            * Se houver erro no Banco de Dados iremos logar este erro e enviar para o
            * client, além de configurar o STATUS da Requisição de resposta como 400
            * (Bad Request). Usado quando o cliente envia dados inválidos
            * */
            console.log('Erros de validação encontrados');
            res.status(400).send(req.validationErrors())
            return;
        }

        /*
        * Com o Body-Parser podemos pegar os objetos da requisição com request.body";
        * Acessando apenas a chave PAGAMENTO do arquivo "files/pagamento.json"
        * */
        let pagamento = req.body['pagamento'];

        pagamento.status = 'EM ABERTO';
        pagamento.data = new Date;

        console.log(pagamento);

        let connection = app.persistence.connectionFactory();
        let pagamentoDAO = new app.persistence.PagamentoDAO(connection);

        pagamentoDAO.salva(pagamento, function (err, result) {

            if (err) {

                console.log('Erro ao inserir no banco: ' + err);
                res.status(500).send(err);
            } else {

                console.log('Pagamento criado');
                pagamento.id = result.insertId;

                /*
                * Realizando o CACHE do pagamento criado
                * */
                new app.services.memcachedClient().set(`pagamento-${pagamento.id}`, pagamento, 60, function (err) {

                    if (err) {

                        console.log('Erro no SET do cache: ' + err);
                    }
                });

                /*
                * Consultando API REST Externa com uma classe de servico
                * */
                if (pagamento.forma_de_pagamento == 'cartao') {

                    let cartao = req.body['cartao'];
                    let clienteCartoes = new app.services.clienteCartoes();

                    clienteCartoes.autoriza(cartao, function (externalError, externalRequest, externalReponse, externalData) {

                        if (externalError) {

                            console.log(externalError);
                            res.status(400).send(externalError);
                            return;
                        }

                        res.location(`/pagamentos/pagamento/${pagamento.id}`);

                        let response = {
                            dados_do_pagamento: pagamento,
                            cartao: externalData,
                            links: [
                                {
                                    href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                                    rel: 'Confirmar',
                                    method: 'PUT'
                                },
                                {
                                    href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                                    rel: 'Cancelar',
                                    method: 'DELETE'
                                }
                            ]
                        };

                        res.status(201).json(response);
                    });

                } else {

                    /*
                    * Conforme o REST, é criado uma nova localização para esta inserção
                    * e passamos para o cliente através do atributo LOCATION no Header
                    * */
                    res.location(`/pagamentos/pagamento/${pagamento.id}`);

                    /*
                    * Com um pagamento criado, são gerados 2 link: CONFIRMAÇÃO e
                    * CANCELAMENTO do pagamento (conforme a regra do negócio).
                    * Passaremos para o cliente estes dados após a inserção efetuada
                    * com sucesso.
                    * */
                    let response = {
                        dados_do_pagamento: pagamento,
                        links: [
                            {
                                href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                                rel: 'Confirmar',
                                method: 'PUT'
                            },
                            {
                                href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
                                rel: 'Cancelar',
                                method: 'DELETE'
                            }
                        ]
                    };
                    /*
                    * Status 201: Significa CREATED. Utilizado na inserção de um novo dado no banco
                    * */
                    res.status(201).json(response);
                }

            }

        });

    });
};

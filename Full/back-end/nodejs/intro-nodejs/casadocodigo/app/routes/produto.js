module.exports = function(app) {
    var listaProdutos = function(req, res, next) {

        var connection = app.infra.connectionFactory();
        new app.infra.ProdutoDAO(connection).lista(function(err, results) {
            if (err) {
                return next(err);
            }
            /* OBS.(Com o res.format() podemos enviar os dados em JSON ou os dados renderizados
                    em uma página HTML. Quem decide o formato é a aplicação que realiza a requisição. 
                    Em sua requisição ele informa ao cabeçalho da requisição (HEADER),se quer um 
                    "aplication/json" ou "text/html" na propriedade ACCEPT do header.) */
            res.format({
                html: function() {
                    res.render('produtos/lista', { lista: results })
                },
                json: function() {
                    res.json(results)
                }
            });
        });

        connection.end();
    };

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    });

    app.post('/produtos', function(req, res) {

        var produto = req.body;

        req.assert('titulo', 'Título é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            res.format({
                html: function() {
                    //O status 400 indica que o usuário fez uma requisição ruim, ou seja, BAD REQUEST
                    res.status(400).render('produtos/form', { errosValidacao: erros, produto: produto });
                },
                json: function() {
                    res.status(400).json(erros)
                }
            });
            return;
        };

        var connection = app.infra.connectionFactory();
        new app.infra.ProdutoDAO(connection).cadastra(produto, function(err, results) {

            res.redirect('/produtos');
        });
    });
}
module.exports = function(app) {

    app.get('/', function(req, res, next) {

        var connection = app.infra.connectionFactory();
        new app.infra.ProdutoDAO(connection).lista(function(err, results) {
            if (err) {
                return next(err);
            }
            res.render('home/index', { livros: results });
        });

        connection.end();
    })
}
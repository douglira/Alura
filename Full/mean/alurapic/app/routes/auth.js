module.exports = function (app) {

    let api = app.api.auth;

    /*
    * Essa rota deve vir primeiro, pois não queremos realizar a verificação de Token nela
    * */
    app.post('/authenticate', api.authenticates);

    /*
    * Todas as rotas após a raiz devem ser protegidas, exceto a rota acima.
    * */
    app.use('/*', api.verifyToken);
};
module.exports = function (app) {

    /*
    * Importando o objeto da api
    * */
    let api = app.api.grupo;

    app.get('/v1/grupos', api.list);
};
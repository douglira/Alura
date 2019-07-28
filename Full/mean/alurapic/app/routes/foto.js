module.exports = function (app) {

    /*
    * Importando o objeto da api
    * */
    let api = app.api.foto;

    /*
    * Usando a mesma rota com verbos HTTP diferentes
    * */
    app.route('/v1/fotos')
        .get(api.list)
        .post(api.add);

    app.route('/v1/fotos/:id')
        .get(api.getById)
        .delete(api.remove)
        .put(api.edit);

};

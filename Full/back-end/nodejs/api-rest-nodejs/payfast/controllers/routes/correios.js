module.exports = function (app) {

    app.post('/correios/calculo-prazo', function (req, res) {

        let dadosDaEntrega = req.body;

        let correiosSOAPClient = new app.services.correiosSOAPClient();
        correiosSOAPClient.calculaPrazo(dadosDaEntrega, function (err, result) {

            if (err) {
                console.log('Erro calculo-prazo: ' + err);
                res.status(400).send(err);
                return;
            }

            res.json(result);
        });
    })
}
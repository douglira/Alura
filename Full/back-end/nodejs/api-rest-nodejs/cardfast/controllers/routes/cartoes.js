module.exports = function (app) {

    app.post('/cartoes/autoriza', function (req, res) {

        console.log('Processando pagamento com cartão');



        req.assert('numero', 'Número obrigatório e conter 16 caracteres.').notEmpty().len(16,16);
        req.assert('bandeira', 'Bandeira do cartão obrigatória.').notEmpty();
        req.assert('ano_de_expiracao', 'Ano de expiração obrigatório e conter 4 caracteres.').notEmpty().len(4,4);
        req.assert('mes_de_expiracao', 'Mês de expiração obrigatório e conter 2 caracteres.').notEmpty().len(2,2);
        req.assert('cvv', 'CVV obrigatório e conter 3 caracteres.').notEmpty().len(3,3);

        if(req.validationErrors()){

            console.log(`Erros de validação encontrados: ${req.validationErrors()}`);
            res.status(400).json(req.validationErrors());
            return;
        }

        let cartao = req.body;
        cartao.status = 'AUTORIZADO';

        let response = {
            dados_do_cartao: cartao
        };

        res.status(201).json(response);
    })
};
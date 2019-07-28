var app = require('express')(),
    consign = require('consign'),                      /*Utilizado para configurar automaticamente os diretórios ao Express*/
    bodyParser = require('body-parser'),               /*Utilizado para poder acessar dados das requisições*/
    expressValidator = require('express-validator')(), /*Utilizado para validação de requisições*/
    morgan = require('morgan'),                        /*Utilizado para o Log de requisições do EXPRESS*/
    logger = require('../services/logger');            /*Utilizando o Logger do Winston em conjunto com o Morgan*/

/*
* A function USE do Express adiciona novos middlewares
* */

/*
* Configurando a variável do Express com o Body-Parser para obter
* os dados do corpo da requisição, sendo em JSON ou Text/html
* */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
* Configurando o Morgan passando o formato do Log das requisições
* e neste caso utilizamos o "combined".
* A mensagem de log gerada pelo Morgan passamos como parâmetro
* para a função que irá escrever e criar o arquivo de Log. Assim,
* usamos o módulo de logs do Winston para gerar o arquivo de log.
* */
app.use(morgan('combined', {
    stream: {
        write: function (log) {

            /*
            * logger.info: função do Winston para
            * escrever o arquivo com o log gerado
            * pelo Morgan, no nível "info".
            * */
            logger.info(log);
        }
    }
}));
/*
* Utilizando o Express Validator para validar as requisições HTTP.
* Esta lib faz com que a lib do Express chamada ASSERT (usada para
* realizar validações) possa ser utilizada pelos objetos request
* */
app.use(expressValidator);

/*
* Com o módulo CONSIGN configuramos os diretórios que dependem do nosso Express,
* neste caso as nossas rotas, persistencias e serviços. Assim evitamos o uso do require.
* */
consign()
    .include('controllers')
    .then('persistence')   /*Adicionando mais um diretório ao Express na ordem de dependência*/
    .then('services')
.into(app);


module.exports = function () {

    return app;
};
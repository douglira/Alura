var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var validatorExpress = require('express-validator');

module.exports = function() {

    var app = express();

    //Configurando os elementos estáticos da página
    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    /* OBS.(O BodyParser transforma o corpo da requisição em JSON ou em HTML 
            de acordo com o CONTENT-TYPE enviado pelo HEADERS) */
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(validatorExpress());

    /* OBS.(ROUTES deve ser carregada primeiro pois os arquivos da INFRA
        necessitam dos arquivos da pasta ROUTES. A propriedade CWD indica
        indica para o LOAD onde se encontra as pastas a serem carregadas) */
    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app);

    /* OBS.(Os Middlewares possuem uma ordem de execução e devem ser executados
            após o carregamento das rotas, pois sua execução depende do caminho
            dessas rotas.) */

    app.use(function(req, res, next) {

        res.status(404).render('error/404');
        next();
    });
    /* OBS.(Um MIDDLEWARE com 4 argumentos é prioritariamente chamado em relação aos outros
            caso ocorra um erro no pipeline de execução das functions do EXPRESS, pois o primeiro
            parâmetro é responsável por capturar este erro.) */
    app.use(function(err, req, res, next) {
        /* OBS.(Renderiza uma página customizada no ambiente de produção caso ocorra um erro no servidor.) */
        if (process.env.NODE_ENV == 'production') {

            res.status(500).render('error/500');
            return;
        }
        next(err);
    });

    /* OBS. (Adicionando um Middleware ao acessar a raiz do site por exemplo.) */
    app.use('/', function(req, res, next) {
        console.log('Acessando site');
        next();
    })

    return app;
}


/* OBS.(O set() é usado para definirmos variáveis para dentro do Express, que passem por 
        todo o sistema.O EXPRESS espera uma string cujo nome é VIEW ENGINE. Como nós estamos 
        utilizando um framework temos que nos adaptar as suas exigências. Assim como escrevemos 
        VIEW ENGINE nós devemos passar também o nome da engine, no caso, o EJS) */
// app.set('view engine', 'ejs');

/* OBS.(Nós usamos o ponto porque não estamos fazendo nenhum caminho relativo ao arquivo
        EXPRESS.JS que está dentro da pasta "config". Nós estamos fazendo o caminho relativo 
        ao local de onde subiremos o servidor com o Express e como estamos subindo ele a partir 
        da raiz do projeto no arquivo APP.JS nós colocamos o ponto (.)) */
// app.set('views', './app/views');
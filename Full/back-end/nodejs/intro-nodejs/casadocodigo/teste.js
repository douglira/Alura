var http = require('http');

/* POST EXAMPLE */
var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log('Corpo:' + body);
    });
});

var produto = {
    titulo: 'O mundo mágico do Node',
    descricao: 'livro de Node, Javasciprt e HTTP',
    preco: 150.90
}

client.end(JSON.stringify(produto));



/* GET EXAMPLE 
var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    headers: {
        'Accept': 'application/json'
    }
};

http.get(configuracoes, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log('Corpo:' + body);
    });
}); */
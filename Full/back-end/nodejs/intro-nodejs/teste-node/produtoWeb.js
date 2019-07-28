//O require() é uma função dentro do Node.js que importa tudo o que necessitamos. Neste caso a Lib HTTP.
var http = require('http');
var porta = 3000;
var ip = 'localhost';

var server = http.createServer(function(req, res) {

    console.log('Recebendo request');
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('<html><body><h1>Listando Produtos</h1></body></html>');
})

//Servidor escutando as requisições na porta e ip especificada no argumento.
server.listen(porta, ip);
console.log('Servidor escutando na porta 3000');
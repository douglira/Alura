let memcached = require('memcached');

function MemcachedClient() {

    return new memcached('localhost:11211', {
        retries: 10,
        retry: 10000,
        remove: true
    });
}

module.exports = function () {
    return MemcachedClient;
};


/*--------------------------------- EXAMPLE/EXPLANATION ------------------------------------------
* Package para administrar o Memcached que precisa ser instalado
* externamento na máquina.
*
* Para subir o servidor do Memcached, vá até o local onde está o arquivo binário
* e execute o comando no terminal "memcached -vv"
* */
// let memcached = require('memcached');

/*
* - Retries: número de retentativas feitas por request ao dado guardado na memória,
*            pois o Memcached levanta o servidor com vários nós para conectividade.
* - Retry: tempo em milissegundos para reconectar após uma falha de um servidor e
*          uma tentativa de colocá-lo de volta em serviço.
* - Remove: true, autoriza a remoção automática de servidores mortos do pool.
* */
// let client = new memcached('localhost:11211', {
//     retries: 10,
//     retry: 10000,
//     remove: true
// });

/*
* Para criar um cache na memória utilizamos o SET passando como parâmetros,
* respectivamente, o nome da chave, o valor a ser cacheado, o
* tempo em segundos no cache e por fim uma função de callback.
* */
// client.set('pagamento-20', {'id': 20, 'valor': 10.90}, 10, function (err) {
//
//     if(err){
//         console.log(err);
//         return;
//     }
//
//     console.log('Nova chave adicionada ao cache: Pagamento 20');
// });

/*
* Buscando o dado no cache
* */
// client.get('pagamento-20', function (err, result) {
//
//     if(err || !result){
//         console.log('MISS - chave não encontrada.');
//     }else{
//         console.log('HIT - valor: ' + JSON.stringify(result));
//     }
// });
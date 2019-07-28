const cluster = require('cluster'),
    os = require('os');

const cpus = os.cpus();

console.log('Executando thread');
if (cluster.isMaster) {

    console.log('Thread Master');

    cpus.forEach(function () {

        /*
        * Gera uma Thread Slave (Thread filha da thread Master)
        * e executa o arquivo na qual foi chamada.
        * */
        cluster.fork();
    });

    cluster.on('listening', function (worker) {
        console.log('Cluster conectado: ' + worker.process.pid);
    });

    cluster.on('exit', worker => {
        console.log('Cluster %d desconectado', worker.process.pid);
        cluster.fork();
    })
} else {

    /*
    * Dividindo a execução da aplicação em threads por núcleo ou CPU, ou
    * seja, em cada CPU da máquina é criada uma Thread rodando a aplicação.
    * Com essa possiblidade do Cluster, aumentamos a escalabilidade.
    * */
    console.log('Thread Slave');
    require('./index.js');
}

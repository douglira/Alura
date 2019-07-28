/*
* Lib File System (fs) do NodeJS para leitura e escrita de arquivos.
* */
let fs = require('fs'),
    path = require('path'),
    filePath = path.join('C:/Users/Douglas/Pictures/Saved Pictures', '/615340.jpg');

/*
* Ler arquivos com Stream é mais eficiente no processamento do que armazenando buffer,
* pois ele cria um fluxo de multi-threads.
*
* Leitura e escrita c/ STREAMS
* */
fs.createReadStream(filePath)
    .pipe(fs.createWriteStream('tech2.jpg'))
    .on('finish', function () {

        /*
        * Essa função de callback do on() é executada quando a stream
        * de escrita do arquivo é finalizada.
        * */
        console.log('Arquivo escrito com Stream');
    });


/*
* Leitura e escrita c/ BUFFER
* */
// fs.readFile(filePath, function (err, buffer) {
//
//     if (err) {
//
//         console.log('ERRO DE LEITURA: ' + err);
//         return;
//     }
//
//     console.log('Arquivo lido');
//     fs.writeFile('imagem-daenerys.jpg', buffer, function (error) {
//
//         if (error) {
//
//             console.log('ERRO DE ESCRITA: ' + error);
//             return;
//         }
//         console.log('Arquivo escrito');
//     })
// });


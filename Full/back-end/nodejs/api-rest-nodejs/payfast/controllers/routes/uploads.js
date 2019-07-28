/*
* --------- curl para teste ----------------
* curl http://localhost:3000/upload/imagem -X POST --data-binary @tech2.jpg -H "Content-type: application/octet-stream" -v -H "filename: imagem-tech.jpg"
*/

let fs = require('fs');

module.exports = function (app) {

    app.post('/upload/imagem', function (req, res) {

        console.log('Recebendo imagem.');
        let filename = req.headers.filename;
        /*
        * Lendo a Stream da requisição com o
        * mesmo sistema de Streams do File System
        * */
        req.pipe(fs.createWriteStream('./files/'+filename))
            .on('finish', function(){

                console.log('Arquivo escrito');
                res.status(201).send('Upload concluído com sucesso');
            });

    })
};
let mongoose = require('mongoose');

/*
* Criando um esquema do Mongoose para a consistência dos dados no MongoDB
* */
let schema = mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    descricao: String,
    grupo: {
        type: Number,
        required: true
    }
});

/*
* Criando o modelo com o Schema criado
* */
mongoose.model('Foto', schema);
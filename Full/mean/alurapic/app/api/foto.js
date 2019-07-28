let mongoose = require('mongoose'),
    Foto = mongoose.model('Foto'),
    api = {};

api.list = function (req, res) {

    Foto
        .find({})
        .then(fotos => {

            res.json(fotos);
        }, err => {

            console.log('Foto List ERROR: ' + err);
            res.status(500).json(err);
        })
};

api.add = function (req, res) {

    Foto
        .create(req.body)
        .then(foto => {

            res.status(201).json(foto);
        }, err => {

            console.log('Foto Add ERROR: ' + err);
            res.status(500).json(err);
        });
};

api.getById = function (req, res) {

    Foto
        .findById(req.params.id)
        .then(foto => {

            if (!foto) throw Error('Foto não encontrada.');
            res.json(foto);
        }, err => {

            console.log('Foto GetById ERROR: ' + err);
            res.json(404).json(err);
        })
};

api.edit = function (req, res) {

    Foto
        .findByIdAndUpdate(req.params.id, req.body)
        .then(foto => {

            res.json(foto);
        }, err => {

            console.log('Foto Edit ERROR: ' + err);
            res.status(500).json(err);
        })
};

api.remove = function (req, res) {

    Foto
        .remove({_id: req.params.id})
        .then(() => {
            res.sendStatus(204);
        }, err => {

            console.log('Foto Remove ERROR: ' + err);
            res.json(404).json(err);
        })
};

module.exports = api;


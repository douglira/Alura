let api = {};

api.list = function (req, res) {

    const grupos = [
        {_id : 1, nome: 'esporte'},
        {_id : 2, nome: 'animal'},
        {_id : 3, nome: 'lugares'}
    ];

    res.json(grupos);
};

module.exports = api;
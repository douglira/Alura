module.exports = app => {

    let mongoose = require('mongoose'),
        jwt = require('jsonwebtoken'), /*Módulo utilizado para autenticação*/
        User = mongoose.model('User'),
        api = {};

    api.authenticates = (req, res) => {

        User
            .findOne({login: req.body.login, password: req.body.password})
            .then(user => {

                if (!user) {

                    /*
                    * Usuário inexistente
                    * */
                    console.log('Login ou senha inválidos');
                    res.sendStatus(401);
                } else {

                    /*
                    * Criando Token
                    * */
                    let token = jwt.sign({login: user.login}, app.get('secret'), {expiresIn: "24h"});
                    console.log('Token criado e sendo enviado no header da resposta.');

                    /*
                    * Aplicando o Token no Header da requisição.
                    * */
                    res.set('x-access-token', token);
                    res.end();
                }

            }, err => {

                console.log('User Authenticates ERROR: ' + err);
                res.sendStatus(401);
            })
    };

    api.verifyToken = (req, res, next) => {

        let token = req.headers['x-access-token'];

        if (token) {

            console.log('Verificando Token...');

            jwt.verify(token, app.get('secret'), (err, decoded) => {

                if (err) {

                    console.log('Token rejeitado');
                    res.sendStatus(401);
                    return;
                }

                req.user = decoded;
                next();
            });
        } else {

            console.log('Token não presente.');
            res.sendStatus(401);
        }

    };

    return api;
};


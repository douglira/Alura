import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDAO } from '../dao/NegociacaoDAO';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    cadastrar(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociacao adicionada com sucesso.')
            .catch(erro => { throw new Error(erro) });
    }

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => { throw new Error(erro) });
    }

    apaga() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .catch(erro => { throw new Error(erro) });
    }

    obterNegociacoes() {

        return Promise.all([
                this._obterNegociacoesDaSemana(),
                this._obterNegociacoesDaSemanaAnterior(),
                this._obterNegociacoesDaSemanaRetrasada()
            ])
            .then(arrayDeNegociacoes => {
                return arrayDeNegociacoes
                    .reduce((flatArray, array) => flatArray.concat(array), []);
            })
            .catch(erro => { throw new Error(erro) });
    }

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoesService =>
                negociacoesService.filter(negociacaoService =>
                    !listaAtual.some(negociacaoLista =>
                        negociacaoService.isEquals(negociacaoLista)))
            );
    }


    /* ---------------------- PROMISE PATTERN RESOLUTION ---------------------------- */


    /* OBS.(O construtor de Promise recebe uma função com os parâmetros RESOLVE e REJECT
        que também são funções e são executadas através de uma CALLBACK, os métodos
            THEN pegam o retorno de RESOLVE e o CATCH do REJECT) */
    _obterNegociacoesDaSemana() {

        //Retorna a instância da Promise criada na HttpService
        return this._http.get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => { throw new Error('Não foi possível importar as negociações da semana.') });
    }


    _obterNegociacoesDaSemanaAnterior() {

        return this._http.get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => { throw new Error('Não foi possível importar as negociações da semana anterior.') });
    }

    _obterNegociacoesDaSemanaRetrasada() {

        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => { throw new Error('Não foi possível importar as negociações da retrasada.') });
    }



    /* -----------CALLBACK RESOLUTION---------------
        
            obterNegociacoesDaSemana(callback) {

            let xhr = new XMLHttpRequest();

            //Método da requisição e o endereço do servidor
            xhr.open('GET', 'negociacoes/semana');

            //Obter os dados do servidor no estado onde a resposta é enviada pelo servidor
            //ESTADOS:

            // 0: requisição ainda não iniciada
            // 1: conexão com o servidor estabelecida
            // 2: requisição recebida
            // 3: processando requisição
            // 4: requisição está concluída e a resposta está pronta (ESTADO DE RESPOSTA DO SERVIDOR NA REQUISIÇÃO AJAX)

            //Executa a função que implementamos no estado de resposta do servidor. STATE 4
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    //Obtemos a resposta apenas se a conexão for OK(200)
                    if (xhr.status == 200) {

                        callback(null, JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {

                        callback('Não foi possível importar as negociações da semana.', null);
                        console.log(xhr.response);
                    }
                }
            }

            xhr.send();
        }


        obterNegociacoesDaSemanaAnterior(callback) {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        callback(null, JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {

                        callback('Não foi possível importar as negociações da semana anterior.', null);
                        console.log(xhr.response);
                    }
                }
            }

            xhr.send();
        }

        obterNegociacoesDaSemanaRetrasada(callback) {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/retrasada');

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        callback(null, JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {

                        callback('Não foi possível importar as negociações da semana retrasada.', null);
                        console.log(xhr.response);
                    }
                }
            }

            xhr.send();
        } */
}
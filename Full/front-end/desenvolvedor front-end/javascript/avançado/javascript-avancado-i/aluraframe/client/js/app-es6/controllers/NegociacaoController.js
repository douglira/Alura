import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';
import { MensagemView } from '../views/MensagemView';
import { NegociacoesView } from '../views/NegociacoesView';
import { NegociacaoService } from '../services/NegociacaoService';
import { Bind } from '../helpers/Bind';
import { DateConverter } from '../helpers/DateConverter';


class NegociacaoController {

    constructor() {
        //Cria um CACHE no construtor evitando que busque toda vez os elementos do DOM ao chamar o método adiciona()
        let $ = document.querySelector.bind(document);


        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Classe Bind retorna a Instância de um Proxy
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );

        this._negociacaoService = new NegociacaoService();

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';

        this._init();

    }

    _init() {

        this._negociacaoService
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        setInterval(() => this.importaNegociacoes(), 3000);
    }

    adiciona(event) {

        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._negociacaoService
            .cadastrar(negociacao)
            .then(mensagem => {

                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                //Setter da mensagem para ser exibida
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {

        /* ------------------ PROMISE PATTERN RESOLUTION --------------------- */

        /* OBS.(Utilizamos o método estático all() da classe PROMISE na qual recebe como parâmetro um
                array de objetos Promise. Desta maneira as Promises (que neste caso são execuções
                de requisições assíncronas do AJAX) são executadas na ordem (ou em sincronia) dentro 
                deste array. Cada execução dos objetos Promise retornam uma função RESOLVE(executada no THEN) 
                e um REJECT(executada no CATCH). No THEN, se for executado todos os RESOLVE, irá formar
                um Array de Array's onde cada array dentro da array possue objetos Negociação.
                Usamos o REDUCE para formar um Array com todos os objetos Negociação, ou seja, os
                objetos Negociacao de cada Array foram tranferidos para esta nova Array(flatArray).
                Com o FOREACH adicionamos todos os objetos da flatArray). */

        this._negociacaoService
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociacoes do período importadas com sucesso.';
            }).catch(erro => this._mensagem.texto = erro);

        /* 
            ------------CALLBACK RESOLUTION--------------------------

            OBS.(Este modelo de implementação para esta situação 
                se tornou muito verboso,pois repetimos muitas vezes 
                a utilização de ERROR-FIRST ocasionando uma cadeia de if's
                e callback's consecutivos (CALLBACK HELL) para sincronizar
                as requisiçoes assíncronas do AJAX formando assim, esta pirâmide 
                de código (Pyramid of Doom))
    
            let service = new NegociacaoService();
        
            service.obterNegociacoesDaSemana((erro, negociacoes) => {

            if (erro) {

                this._mensagem.texto = erro;
                return
            }

            negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao) });

            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {

                if (erro) {

                    this._mensagem.texto = erro;
                    return
                }

                negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao) });

                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {

                    if (erro) {

                        this._mensagem.texto = erro;
                        return
                    }

                    negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao) });
                    this._mensagem.texto = 'Negociações importadas com sucesso.';
                });
            });
        }); */
    }

    ordena(coluna) {

        if (this._ordemAtual == coluna) {

            this._listaNegociacoes.inverteOrdem();
            this._ordemAtual = '';
        } else {

            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
            this._ordemAtual = coluna;
        }

    }

    apaga() {

        this._negociacaoService
            .apaga()
            .then(mensagem => {

                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    _criaNegociacao() {

        return new Negociacao(
            DateConverter.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();
export function currentInstance() {

    return negociacaoController;
}
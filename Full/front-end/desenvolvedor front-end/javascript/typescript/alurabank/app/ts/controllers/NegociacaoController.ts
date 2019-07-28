/* CURIOSIDADE: No TypeScript é possível um método possuir mais de um tipo no retorno.
Por exemplo: minhaFuncao(): boolean | string {//implementação aqui}; 
Dessa maneira podemos retornar mais de um tipo como 'string' ou 'boolean' no exemplo acima.
Isso é usado caso a propriedade 'strictNullChecks' esteja ativada no tsconfig.json */


/* ------------------------- TypeScript c/ JQuery ---------------------------- */
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoAPI } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../services/index';
import { imprime } from '../helpers/index';
export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView('#mensagemView', true);
    private _negociacaoService = new NegociacaoService();

    constructor() {

        this._negociacoesView.update(this._negociacoes);
    }

    /* OBS.(Utilizando um DECORATOR sobre o método. Tem como principal função interceptar
            a execução do método decorado e executar junto ao método uma lógica de acordo 
            com a necessidade do programador.)  */
    @throttle()
    adiciona(/* event: Event */) {

        /* event.preventDefault(); */

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        if (!negociacao.ehDiaUtil()) {
            this._mensagemView.update('Negociações são válidas apenas em dia útil.');
            return
        }

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
        this._hideMessage();
    }

    //Padrão de Projeto THROTTLE
    @throttle()
    async importaDados() {

        try {

            const isOK: HandlerFunction = (resp: Response): Response => {

                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }

                return resp;
            }

            /* OBS.(AWAIT irá suspender a execução do método ASYNC. Quando o retorno
                    da Promise marcada com o AWAIT concluir, o método ASYNC irá realizar
                    o resto da execução. ASYNC/AWAIT tem como papel transformar as execuções
                    Assíncronas em Síncronas.) */
            const negociacoesAPI = await this._negociacaoService
                .obterNegociacoes('http://localhost:8080/dados', isOK);

            if (negociacoesAPI) {

                const negociacoesView = this._negociacoes.getLista();
                negociacoesAPI
                    .filter(negociacaoAPI =>
                        !negociacoesView.some(negociacaoView => negociacaoAPI.equals(negociacaoView))
                    )
                    .forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao))
            }
            this._negociacoesView.update(this._negociacoes);
            this._mensagemView.update('Negociação importadas com sucesso');
            this._hideMessage();
        } catch (err) {
            this._mensagemView.update(err.message);
        }

    }

    _hideMessage() {
        let paragrafo = $('.alert');

        setTimeout(function() {
            if (paragrafo) {
                paragrafo.remove();
            }
        }, 2800);

    }
}

/* ------------------------- TypeScript s/ JQuery ---------------------------- */


// class NegociacaoController{

//     private _inputData: HTMLInputElement;
//     private _inputQuantidade: HTMLInputElement;
//     private _inputValor: HTMLInputElement;
//     private _negociacoes = new Negociacoes();
//     private _negociacoesView = new NegociacoesView('#negociacoesView');
//     private _mensagemView = new MensagemView('#mensagemView');

//     constructor(){

//         /* OBS.(Como o querySelector() nos retorna um tipo genérico que é ELEMENT, somos
//                 obrigados a realizar um <CASTING> para um tipo específico das tags do HTML.
//                 Neste caso para as tags de INPUT usamos a interface HTMLInputElement, 
//                 "tipando" explicitamente o conteúdo que estamos buscando no DOM. No TypeScript,
//                 quando passamos um tipo genérico para um específico é necessário o CASTING, porém
//                 de maneira contrária não é necessário.) */
//         this._inputData = <HTMLInputElement> document.querySelector('#data');
//         this._inputQuantidade = <HTMLInputElement> document.querySelector('#quantidade');
//         this._inputValor = <HTMLInputElement> document.querySelector('#valor');
//         this._negociacoesView.update(this._negociacoes);
//     }

//     adiciona(event: Event){

//         event.preventDefault();

//         const negociacao = new Negociacao(
//             new Date(this._inputData.value.replace(/-/g, ',')),
//             parseInt(this._inputQuantidade.value),
//             parseFloat(this._inputValor.value)
//         );

//         this._negociacoes.adiciona(negociacao);
//         this._negociacoesView.update(this._negociacoes);
//         this._mensagemView.update('Negociação adicionada com sucesso');
//         this._hideMessage();
//     }

//     _hideMessage(){

//         setTimeout(function(){
//             document.querySelector('.alert').remove()
//         }, 2800);
//     }
// }
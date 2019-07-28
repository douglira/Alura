export class Negociacao {

    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime());
        /* O método getTime() retorna um número long na qual podemos passar pelo construtor do Date
         * criando assim uma nova referência dentro da nossa classe com a mesma data, fazendo com que 
         * ela seja imutável fora da classe. Pois os objetos da classe Date possuem métodos Setters, 
         * desse modo os Setters irão modificar uma nova referência que é instanciada pelo Getter desta classe.
         */
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
        /* Este método impede que os atributos sejam alterados diretamente
         * possibilitando o "encapsulamento" destes atributos
         */

    }

    /* O UNDERLINE (_) é uma convenção no JavaScript que encapsula seus atributos dizendo
     * que apenas os métodos de acesso da classe podem alterar seus próprios atributos.
     */

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    isEquals(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
}
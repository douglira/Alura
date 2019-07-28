export class Mensagem {

    constructor(texto = '') {

        this._mensagem = texto;
    }

    get texto() {

        return this._mensagem;
    }

    set texto(mensagem) {

        this._mensagem = mensagem;
    }
}
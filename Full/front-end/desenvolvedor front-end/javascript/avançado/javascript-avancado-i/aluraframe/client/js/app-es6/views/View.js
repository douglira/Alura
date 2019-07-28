export class View {

    constructor(elemento) {

        this._elemento = elemento;
    }

    template() {

        throw new Error('O método template deve ser implementado nas classes filhas.');
    }

    update(model) {

        //innerHTML() está convertendo a String em elementos do html
        this._elemento.innerHTML = this.template(model);
    }
}
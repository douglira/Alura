import { Negociacao } from './Negociacao';
import { MeuObjeto } from './MeuObjeto';
export class Negociacoes implements MeuObjeto<Negociacoes> {

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    getLista(): Negociacao[] {

        // Através do alias 'as' delegamos o tipo desse array criado. Tudo entre parenteses.
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    volumeTotal(): number {

        return this._negociacoes.reduce((total, ponteiro) => total + ponteiro.volume, 0.0);
    }

    paraTexto(): void {

        console.log('IMPRESSÃO');
        console.log(JSON.stringify(this._negociacoes));
    }

    equals(negociacoes: Negociacoes): boolean {

        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.getLista());
    }
}
import { Negociacao, NegociacaoAPI } from '../models/index';

export class NegociacaoService {

    obterNegociacoes(url: string, handler: HandlerFunction): Promise<void | Negociacao[]> {

        return fetch(url)
            .then(response => handler(response).json())
            .then((dados: NegociacaoAPI[]) => 
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)))
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível importar as negociações');
            });
    }
}

export interface HandlerFunction{

    (res: Response): Response;
}
import {View} from './View';
import {Negociacao} from '../models/Negociacao';
import {Negociacoes} from '../models/Negociacoes';
export class NegociacoesView extends View<Negociacoes>{

    template(model: Negociacoes): string{

        return`
        
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${model.getLista().map(negociacao => 
                    `
                        <tr>
                            <td>${negociacao.data.getDate()}/${negociacao.data.getMonth()+1}/${negociacao.data.getFullYear()}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}</td>
                        </tr>
                    `
                ).join('')}
            </tbody>

            <tfoot>
                <td colspan="3"></td>
                <td>${model.volumeTotal()}</td>
            </tfoot>
        </table>               
        
        `;
    }
}
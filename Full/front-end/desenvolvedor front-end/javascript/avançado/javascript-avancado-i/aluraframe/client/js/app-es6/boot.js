import { currentInstance } from './controllers/NegociacaoController';

let negociacaoController = currentInstance();

document.querySelector('#form-adiciona-negociacao').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#apaga-negociacoes').onclick = negociacaoController.apaga.bind(negociacaoController);
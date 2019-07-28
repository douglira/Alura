import {NegociacaoController} from './controllers/NegociacaoController';
const negociacaoController = new NegociacaoController();

$('.form').submit(negociacaoController.adiciona.bind(negociacaoController));
$('#botao-importa').click(negociacaoController.importaDados.bind(negociacaoController));
/* --------------------------------- TypeScript s/ JQuery ---------------------------------
document
    .querySelector('.form')
    .addEventListener('submit', negociacaoController.adiciona.bind(negociacaoController)); 
    */
import { ProxyFactory } from '../services/ProxyFactory';

//Classe responsável para administrar o MODEL e a VIEW
export class Bind {
    // Reticências (...) é um REST OPERATOR que transforma todas os parâmetros passados,
    // neste caso após a VIEW, em um array. Podendo assim ter N parâmetros
    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(model, props, model => view.update(model));

        view.update(model);

        return proxy;
    }
}
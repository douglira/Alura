/* OBS.(Na classe VIEW é possível passar como parâmetro os tipos que as classes filhas irão trabalhar.
        Como convenção usa-se <T> para representar os tipoes que estão sendo passados.) */
import {logarTempoDeExecucao} from '../helpers/decorators/index';
export abstract class View<T> {

    private _elemento: JQuery;
    private _escapar: boolean;
    
    /* //O sinal de interrogação (?) indica que o parâmetro é opcional.
    constructor(seletor: string, escapar?: boolean){ */

    // Um parâmetro BOOLEAN inicializado com FALSE também se torna opcional.
    constructor(seletor: string, escapar: boolean = false){ 

        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    // @logarTempoDeExecucao(true)
    update(model: T): void{

        let template = this.template(model);
        /* Escapando qualquer tag SCRIPT e seu conteúdo colocada no template indevidamente */
        if(this._escapar) template = template.replace(/<script>[\s\S]*?<\/script>/, '');        

        this._elemento.html(template);
    }

        abstract template(model: T): string;
}
import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'botao',
    templateUrl: './botao.component.html'
})
export class BotaoComponent{

    @Input() nome: string = 'Ok';
    @Input() estilo: string = 'btn-default';
    @Input() tipo: string = 'button';
    @Input() desabilitado: boolean = false;
    @Input() confirmacao: boolean;
    @Output() acao = new EventEmitter();

    acaoExecutada() {

        if(this.confirmacao){

            if(confirm('Deseja excluir?')){

                this.acao.emit(null);
            }
            return;
        }

        this.acao.emit(null);
    }
}
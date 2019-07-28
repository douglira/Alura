import {Component} from "@angular/core";
import {FotoComponent} from "../foto/foto.component";
import {FotoService} from "../foto/foto.service";
import {PainelComponent} from "../painel/painel.component";

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {

    fotos: FotoComponent[] = [];
    mensagem: string = '';
    service: FotoService;

    constructor(service: FotoService) {

        this.service = service;
        this.service
            .lista()
            .subscribe(fotos => {

                this.fotos = fotos;
            }, err => console.log(err));
    }

    remover(foto: FotoComponent, painel: PainelComponent){

        this.service
            .remove(foto)
            .subscribe(() => {

                painel.fadeOut(() => {

                    let novasFotos = this.fotos.slice(0);
                    let index = novasFotos.indexOf(foto);
                    novasFotos.splice(index, 1);
                    this.fotos = novasFotos;
                    this.mensagem = 'Foto removida com sucesso.';
                });
            }, error => {

                this.mensagem = 'Não foi possível remover a foto';
                console.log(error)
            });
    }
}
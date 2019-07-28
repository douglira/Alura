import {Pipe, PipeTransform} from "@angular/core";
import {FotoComponent} from "./foto.component";

@Pipe({
    name: 'filtroPorTitulo'
})
export class FotoPipe implements PipeTransform {

    transform(fotos: FotoComponent[], texto: string): FotoComponent[] {

        texto = texto.toLowerCase();
        if(texto){

            return fotos.filter(foto => foto.titulo.toLocaleLowerCase().includes(texto));
        }

        return fotos;
    }

}
import {NgModule} from "@angular/core";
import {FotoComponent} from "./foto.component";
import {FotoPipe} from "./foto.pipe";
import {FotoService} from "./foto.service";

@NgModule({
    declarations: [FotoComponent, FotoPipe],
    exports: [FotoComponent, FotoPipe],
    providers: [FotoService]
})
export class FotoModule {

}
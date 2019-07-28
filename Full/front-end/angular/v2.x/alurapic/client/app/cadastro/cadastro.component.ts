import {Component} from "@angular/core";
import {FotoComponent} from "../foto/foto.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FotoService} from "../foto/foto.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto: FotoComponent = new FotoComponent();
    mensagem: string = '';
    myForm: FormGroup;
    service: FotoService;
    route: ActivatedRoute;
    router: Router;

    constructor(service: FotoService, fb: FormBuilder, route: ActivatedRoute, router: Router) {

        this.route = route;
        this.router = router;
        this.service = service;


        this.route.params.subscribe(params => {

            if (params['id']) {

                this.service
                    .buscaPorId(params['id'])
                    .subscribe(
                        foto => this.foto = foto,
                        error => console.log(error)
                    );
            }

        });

        this.myForm = fb.group({
            titulo: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ['', Validators.required],
            descricao: ['']
        })
    }

    cadastrar(event) {

        event.preventDefault();

        this.service
            .cadastra(this.foto)
            .subscribe((res) => {

                this.mensagem = res.mensagem;
                this.foto = new FotoComponent();
                if (!res.inclusao) this.router.navigate(['']);
                console.log('Foto cadastrada com sucesso.');
            }, error => {

                console.log(error);
            })
    }
}
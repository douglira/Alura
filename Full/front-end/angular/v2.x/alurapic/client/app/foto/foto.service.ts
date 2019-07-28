import {Http, Headers, Response} from "@angular/http";
import {FotoComponent} from "./foto.component";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {clearScreenDown} from "readline";

@Injectable()
export class FotoService {

    http: Http;
    headers: Headers;
    url: string = 'v1/fotos';

    /*
    * Para a injeção do Http é necessário a utilização de um Provider.
    * Este provider é importado no arquivo principal da aplicação (app.module.ts)
    * no qual irá importar o provedor HttpModule
    * */
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastra(foto: FotoComponent): Observable<any> {

        if (foto._id) {

            return this.http
                .put(`${this.url}/${foto._id}`, JSON.stringify(foto), {headers: this.headers})
                .map(() => ({mensagem: 'Foto alterada com sucesso.', inclusao: false}));
        } else {

            return this.http
                .post(this.url, JSON.stringify(foto), {headers: this.headers})
                .map(() => ({mensagem: 'Foto cadastrada com sucesso.', inclusao: true}))
        }
    }

    lista(): Observable<FotoComponent[]> {

        return this.http
            .get(this.url)
            .map(res => res.json())

    }

    remove(foto: FotoComponent): Observable<Response> {

        return this.http
            .delete(`${this.url}/${foto._id}`);
    }

    buscaPorId(id): Observable<FotoComponent> {

        return this.http
            .get(`${this.url}/${id}`)
            .map(res => res.json());
    }
}

export class MensagemCadastro {

    constructor(private _mensagem: string, private _inclusao: boolean) {
        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }

    public get mensagem(): string {

        return this._mensagem;
    }

    public get inclusao(): boolean {

        return this._inclusao;
    }
}
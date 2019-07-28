import { MeuObjeto } from './MeuObjeto';
export class Negociacao implements MeuObjeto<Negociacao> {

    constructor(
        /* O modificador READONLY torna a proprieda privada e gera implicitamente apenas seus GETTERS.
        E qualquer atribuição gera um erro de compilação */
        readonly data: Date,
        readonly quantidade: number,
        readonly valor: number
    ) { }

    get volume() {

        return this.quantidade * this.valor;
    }

    ehDiaUtil(): boolean {

        return this.data.getDay() != DiaDaSemana.Domingo && this.data.getDay() != DiaDaSemana.Sábado;
    }

    paraTexto(): void {

        console.log('IMPRESSÃO');
        console.log(`
        DATA: ${this.data}
        QUANTIDADE: ${this.quantidade}
        VALOR: ${this.valor}
        VOLUME: ${this.volume}
        `);
    }

    equals(negociacao: Negociacao): boolean {

        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sábado
}

// export class Negociacao {

//     /* Desta maneira, automaticamente o TypeScript recebe os parâmetros pelo construtor
//         e atribui os seus valores as propriedades da classe de forma resumida comparado
//         ao modelo comentado abaixo. */
//     constructor(
//         private _data: Date, 
//         private _quantidade: number, 
//         private _valor: number
//     ){}

//     /* OBS.(No mundo TypeScript as variáveis possuem um tipo padrão implicitamente que é ANY. Ao definir a
//         a propriedade "noImplicitAny = TRUE" no arquivo de configuração do TypeScript (tsconfig.json), seremos
//         forçados a "tipar" todas a propriedades que criarmos, como por exemplo no modelo abaixo, Date,
//         number, etc. Neste modelo é o jeito convencional de se "tipar" as propriedades da classe, sempre
//         após da declaração das mesmas.) 
//     ---------------------------------------------------------------------------------------------------------
//     */
//     /* private _data: Date;
//     private _quantidade: number;
//     private _valor: number;

//     constructor(data: Date, quantidade: number, valor: number) {

//         this._data = data;
//         this._quantidade = quantidade;
//         this._valor = valor;
//     } 
//     -----------------------------------------------------------------------------------------------------------*/

//     get data() {

//         return this._data;
//     }

//     get quantidade() {

//         return this._quantidade;
//     }

//     get valor() {

//         return this._valor;
//     }

//     get volume() {

//         return this._quantidade * this._valor;
//     }
// }
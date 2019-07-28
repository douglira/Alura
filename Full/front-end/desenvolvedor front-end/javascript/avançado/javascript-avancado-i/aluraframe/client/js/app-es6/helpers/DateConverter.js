export class DateConverter {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static dataParaTexto(data) {
        //TEMPLATE STRING é utilizado com um BACKSTICK(CRASE);
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
        // return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    }

    static textoParaData(texto) {

        if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('Formato da data deve ser: aaaa-mm-dd');

        /* 
         * SPREAD OPERATOR: Reticencias (...) desmenbra o array transformando cada posição
         * em um parâmetro do construtor Date();
         */

        //Arrow Function que omite a palavra FUNCTION, a RETURN  e as CHAVES {};
        //A % é um cálculo modular do JavaScript que retorna o RESTO de uma DIVISÃO;
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }
}
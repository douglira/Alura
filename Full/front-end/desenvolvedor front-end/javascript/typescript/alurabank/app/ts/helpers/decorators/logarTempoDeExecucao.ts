export function logarTempoDeExecucao(emSegundos: boolean = false){

    /* OBS.(O método a ser exportado é o nome do DECORATOR que estaremos utilizando sobre
            um método e é necessário ele retornar uma função. Essa função a ser retornada 
            recebe como parâmetro o TARGET que é a referência do método que está sendo 
            decorado (ou seja o THIS do método decorado irá apontar para o objeto na qual 
            ele pertence), o KEY é o nome do método decorado e por fim, o DESCRIPTOR nos 
            dará acesso a implementação ou execução do método decorado.)*/
    return function(target: any, key: string, descriptor: PropertyDescriptor){

        /* Através da propriedade VALUE acessamos a implementação ou execução do método
            e guardamos o método original em uma variável */
        const metodoOriginal = descriptor.value;

        //Sobrescrevendo o método original
        descriptor.value = function(...args: any[]){
            let unidade = 'ms';
            let divisor = 1;

            if(emSegundos){
                unidade = 's';
                divisor = 1000;
            }

            console.log('-------------------------------------------------');
            console.log(`Os parâmetros do método "${key}" são: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            //Guardaremos o retorno caso o método original retorne algo após sua execução
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`Resultado do método: ${JSON.stringify(retorno)}`);
            console.log(`"${key}" demorou: ${(t2 - t1)/divisor}${unidade}`);
            console.log('---------------------------------------------------')
            return retorno;
        }

        return descriptor;
    }
}
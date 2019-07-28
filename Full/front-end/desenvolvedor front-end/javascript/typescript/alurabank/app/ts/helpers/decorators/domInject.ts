/* OBS.(Este decorator tem como função realizar um getter aos elementos do DOM
        apenas quando as propriedades, que estão sobre a ação deste decorator, 
        forem chamadas. Assim não realizaremos um cache dos elementos do DOM 
        quando o construtor do objeto que possui essas propriedades for chamado.
        Esta técnica é chamada de LAZY LOADING) */
export function domInject(seletor: string){

    return function(target: any, key: string){

        let elemento: JQuery;

        const getter = function(){

            if(!elemento){
                console.log(`Buscando o elemento ${seletor} para "${key}"`);
                elemento = $(seletor);
            }

            return elemento;
        }

        //Associamos o getter criado ao GET da propriedade alvo.
        Object.defineProperty(target, key, {
            get: getter
        })
    }
}
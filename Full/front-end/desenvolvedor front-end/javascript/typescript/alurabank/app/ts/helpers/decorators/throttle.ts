/* OBS.(O THROTTLE é um padrão de projeto para requisicões AJAX no qual impede que
        o usuário "metralhe" o servidor com várias requisições através de mútiplos
        clicks no botão. Com o DECORATOR interceptamos o evento de click e fizemos
        com que o método que executa uma requisição AJAX seja executado 0.5s após o
        evento de click no botão.) */
export function throttle(milissegundos = 500) {

    return function (target: any, key: string, descriptor: PropertyDescriptor) {

        let metodo = descriptor.value;
        let timer = 0;
        descriptor.value = function (...args: any[]) {

            if(event) event.preventDefault();
            clearInterval(timer);
            timer = setTimeout(() => {

                metodo.apply(this, args);
            }, 500); 
        }

        return descriptor;
    }
}
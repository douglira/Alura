angular.module('alurapic')
.factory('tokenInterceptor', function($window, $q, $location) {

    let interceptor = {};

    /*
    * Executado toda vez que recebemos umas resposta do servidor
    * */
    interceptor.response = response => {

        let token = response.headers('x-access-token');
        if(token){

            $window.sessionStorage.token = token;
            console.log('Token armazenado no navegador.');
        }
        return response;
    };

    /*
    * Através do parâmetro CONFIG que temos acesso à requisição do AJAX
    * feita pela aplicação Angular para o Servidor
    * */
    interceptor.request = config => {

        /*
        * Caso o HEADER exista ele irá receber ele mesmo, caso não exista receberá
        * um objeto em branco.
        * */
        config.headers = config.headers || {};
        if($window.sessionStorage.token){
            /*
            * Se esse token existir, guardaremos no cabeçalho da requisição
            * */
            config.headers['x-access-token'] = $window.sessionStorage.token;
            console.log('Adicionando token no header da requisição para ser enviado ao servidor');
        }

        return config;

    };

    interceptor.responseError = rejection => {

        if(rejection != null && rejection.status == 401){

            delete $window.sessionStorage.token;
            $location.path('/login');
        }

        return $q.reject(rejection);
    };

    return interceptor;
});
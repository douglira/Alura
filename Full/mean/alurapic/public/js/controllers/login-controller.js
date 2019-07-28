angular.module('alurapic').controller('LoginController', function ($scope, $http, $location) {

    $scope.user = {};
    $scope.msg = '';

    $scope.authenticate = function () {

        let user = {};
        user.login = $scope.user.login;
        user.password = $scope.user.password;

        $http.post('/authenticate', {login: user.login, password: user.password})
            .then(() => {

                $location.path('/');
            }, err => {

                console.log('Authenticate ERROR: ' + err);
                $scope.user = {};
                $scope.msg = 'Login ou senha inválidos';
            })
    }

});
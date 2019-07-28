const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';

let connection = null;

let close = null;

export class ConnectionFactory {

    constructor() {

        throw new Error('Não é possível instânciar esta classe');
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory._createStore(e.target.result);

            };

            openRequest.onsuccess = e => {

                if (!connection) {

                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function() {
                        throw new Error('Não é possível fechar diretamente a conexão');
                    };
                }
                resolve(connection);
            };

            openRequest.onerror = e => {

                console.log(e.target.error);
                reject(e.target.error.name);
            };
        })
    }

    static _createStore(connection) {

        stores.forEach(store => {

            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);

            connection.createObjectStore(store, { autoIncrement: true });
        })
    }

    static closeConnection() {

        if (connection) {

            close();
            connection = null;
        }
    }
}

// /* ------------------------------------- MODULE PATTERN --------------------------------------------- */

// /* OBS.(Um módulo é uma unidade confinada que ninguém possui acesso dentro dele. Com isso estamos
//         impossibilitando o acesso às variáveis globais declaradas dentro da função anônima autoinvocada (IIFE).
//         Para realizar este padrão, colocamos a função dentro de um parênteses e logo em seguida abrimos e 
//         fechamos outro parênteses(function(){})().Os parênteses após a função anônima irão invocá-la 
//         automaticamente, fazendo com que simultaneamente ela seja carregada e executada.*/

// var ConnectionFactory = (function() {

//     /* Utilizando a declaração de variável CONST não poderemos reatribuir valor 
//     à essas variáveis. Tornando assim essas variáveis IMUTÁVEIS já que não queremos
//     que seus valores sejam reatribuidos */
//     const stores = ['negociacoes'];
//     const version = 4;
//     const dbName = 'aluraframe';
//     /*Declaração da variável fora da classe para que a conexão 
//     seja sempre a mesma quando chamar o método getConnection();*/
//     var connection = null;

//     var close = null;

//     return class ConnectionFactory {

//         constructor() {

//             throw new Error('Não é possível instânciar esta classe');
//         }

//         static getConnection() {

//             return new Promise((resolve, reject) => {

//                 let openRequest = window.indexedDB.open(dbName, version);

//                 openRequest.onupgradeneeded = e => {

//                     ConnectionFactory._createStore(e.target.result);

//                 };

//                 openRequest.onsuccess = e => {

//                     if (!connection) {

//                         connection = e.target.result;
//                         /* Com o método BIND, estamos dizendo para o THIS dentro da função close()
//                         manter a referência ao objeto CONNECTION. Se passarmos a função para a
//                         variável close sem o BIND, o THIS irá perder a referência à CONNECTION e
//                         quando executarmos o close (nossa variável que recebeu a função original)
//                         no método closeConnectio() irá ocorrer um erro devido ao THIS não referenciar
//                         nenhum objeto. */
//                         close = connection.close.bind(connection);
//                         /* MONKEY PATCH: Sobrescrevemos a função close() do CONNECTION para que
//                         não seja fechada diretamente em outras partes da aplicação, já que a conexão
//                         é sempre a mesma. */
//                         connection.close = function() {
//                             throw new Error('Não é possível fechar diretamente a conexão');
//                         };
//                     }
//                     resolve(connection);
//                 };

//                 openRequest.onerror = e => {

//                     console.log(e.target.error);
//                     reject(e.target.error.name);
//                 };
//             })
//         }

//         static _createStore(connection) {

//             stores.forEach(store => {

//                 if (connection.objectStoreNames.contains(store))
//                     connection.deleteObjectStore(store);

//                 connection.createObjectStore(store, { autoIncrement: true });
//             })
//         }

//         static closeConnection() {

//             if (connection) {

//                 close();
//                 connection = null;
//             }
//         }
//     }
// })();
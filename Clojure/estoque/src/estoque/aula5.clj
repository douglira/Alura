(ns estoque.aula5)

(def estoque {"Mochila" 10 "Camiseta" 5})
(def estoque {"Mochila" 10, "Camiseta" 5})                  ; Boa prática da vírgula quando na mesma linha
(println estoque)
(println "Temos" (count estoque) "elementos")
(println "Chaves são:" (keys estoque))
(println "Valores são:" (vals estoque))

; keyword
; :mochila
(def estoque {:mochila  10
              :camiseta 5})

; ASSOC - novo valor
(println (assoc estoque :cadeira 3))

; DISSOC - remove o valor
(println (dissoc estoque :camiseta))

(println (update estoque :mochila #(- % 3)))




(println "\n\n\n\n\n\n")
(def pedido {:mochila  {:quantidade 2, :preco 80}
             :camiseta {:quantidade 3, :preco 40}})
(println pedido)

(println (assoc pedido :chaveiro {:quantidade 1, :preco 10}))
(println (pedido :mochila))
(println (get pedido :carro {}))
(println (pedido :carro {}))                                ; Traz um map default ao invés de nil
(println "Busca através do keyword" (:mochila pedido {}))   ; Maneira mais comum e usada
(println (:quantidade (:mochila pedido {})))                ; Acessando a quantidade aninhada
(println (update-in pedido [:mochila :quantidade] #(* % 2))) ; Navegar e atualizar o objeto

; THREAD FIRST - encadeando as chamadas de acesso ao MapEntry e
; passando a coleção como primeiro argumento de cada chamada da keyword
(println (-> pedido
             :mochila
             :quantidade))
(-> pedido
    :mochila
    :quantidade
    println)
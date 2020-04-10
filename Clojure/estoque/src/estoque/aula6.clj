(ns estoque.aula6)

(def pedido {:mochila  {:quantidade 2, :preco 80}
             :camiseta {:quantidade 3, :preco 40}})

(defn imprime-e-15
  [valor]
  (println "valor" (class valor) valor)
  15)
(println (map imprime-e-15 pedido))
;
;(defn imprime-e-15
;  [chave valor]
;  (println chave "e" valor)
;  15)
;(println (map imprime-e-15 pedido))


(defn imprime-e-15
  [[chave valor]]
  (println chave "---->" valor)
  15)
(println (map imprime-e-15 pedido))


(defn retorna-valor
  [[chave valor]]
  valor)
(println (map retorna-valor pedido))

(defn preco-por-item [[nome-produto info-produto]]
  (* (:quantidade info-produto) (:preco info-produto)))
(println (map preco-por-item pedido))
(println "Total:" (reduce + (map preco-por-item pedido)))

(defn preco-por-item [[_ info-produto]]                     ;Underline quando o parametro não for usado
  (* (:quantidade info-produto) (:preco info-produto)))
(println (map preco-por-item pedido))
(println "Total:" (reduce + (map preco-por-item pedido)))

(defn total-do-pedido
  [pedido]
  (reduce + (map preco-por-item pedido)))
(println "Total do pedido:" (total-do-pedido pedido))



; THREAD LAST - encadeando as chamadas de acesso ao MapEntry e
; passando a coleção como último argumento de cada chamada. Neste
; caso as chamadas são: map e reduce. Como essas duas chamadas esperam
; como primeiro argumento a função e segundo argumento a coleção, temos
; que realizar a anotação para thread last.
(defn total-do-pedido
  [pedido]
  (->> pedido                                               ; Anotação para threading last
       (map preco-por-item)
       (reduce +)))
(println "[THREADING] Total do pedido:" (total-do-pedido pedido))

; VALS - Aplicando a função na thread para pegar apenas os valores do MapEntry
(defn preco-total-do-produto [info-produto]
  (* (:quantidade info-produto) (:preco info-produto)))
(defn total-do-pedido
  [pedido]
  (->> pedido
       vals                                                 ; Acessando os valores apenas
       (map preco-total-do-produto)
       (reduce +)))
(println (total-do-pedido pedido))










(def pedido {:mochila  {:quantidade 2, :preco 80}
             :camiseta {:quantidade 3, :preco 40}
             :chaveiro {:quantidade 1}})

(defn gratuito?
  [item]
  (<= (:preco item 0) 0))

(println "Filtrando gratuitos" (filter gratuito? (vals pedido)))



(defn gratuito?
  [[_ item]]
  (<= (:preco item 0) 0))

(println "Filtrando gratuitos" (filter gratuito? pedido))





(defn gratuito?
  [item]
  (<= (:preco item 0) 0))

(println "Filtrando gratuitos" (filter (fn [[_ item]] (gratuito? item)) pedido))
(println "Filtrando gratuitos" (filter #(gratuito? (second %)) pedido)) ; Second pega o valor do MapEntry através do Lambda



(defn pago?
  [item]
  (not (gratuito? item)))
(println (pago? {:preco 50}))
(println (pago? {:preco 0}))

; NOT e GRATUITO? é uma composição de função então pode-se realizar a operação abaixo
; passando o parâmetro primeiro ao GRATUITO e depois para o NOT
(println ((comp not gratuito?) {:preco 50}))

; Composição de função sendo atribuida
(def pago? (comp not gratuito?))
(println (pago? {:preco 50}))
(println (pago? {:preco 0}))














































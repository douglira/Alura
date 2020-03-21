(ns estoque.aula3)


(defn valor-descontado
  "Retorna o valor com desconto de 10% se o valor bruto for estritamente maior que 100."
  [valor-bruto]
  (if (> valor-bruto 100)
    (let [taxa-de-desconto (/ 10 100)
          desconto (* valor-bruto taxa-de-desconto)]
      (prn "Calculando o desconto de" desconto)
      (- valor-bruto desconto))
    valor-bruto))

(prn (valor-descontado 1000))
(prn (valor-descontado 100))

; Predicate - Funções com interrogação
(defn deve-aplicar-desconto?
  [valor-bruto]
  (if (> valor-bruto 100)
    true
    false))

(prn (deve-aplicar-desconto? 1000))
(prn (deve-aplicar-desconto? 100))


(defn aplica-desconto?
  [valor-bruto]
  (if (> valor-bruto 100)
    true
    false))

(prn (aplica-desconto? 1000))
(prn (aplica-desconto? 100))






(defn valor-descontado
  "Retorna o valor com desconto de 10% se o valor bruto for estritamente maior que 100."
  [valor-bruto]
  (if (aplica-desconto? valor-bruto)                        ; Chamada da função (lookup) feita em tempo de execução
    (let [taxa-de-desconto (/ 10 100)
          desconto (* valor-bruto taxa-de-desconto)]
      (- valor-bruto desconto))
    valor-bruto))

(prn (valor-descontado 1000))
(prn (valor-descontado 100))




(defn aplica-desconto?
  [valor-bruto]
  (prn "Chamando a versão WHEN")
  (when (> valor-bruto 100)                                 ; Como o when só possui o caso "Verdadeiro" (não existe o
    true))                                                  ; else) ele só irá executar as N aridades programadas e
(prn (aplica-desconto? 1000))                               ; devolverá o último valor se for uma condição verdadeira.
(prn (aplica-desconto? 100))
(prn (valor-descontado 1000))
(prn (valor-descontado 100))







(defn aplica-desconto?
  [valor-bruto]
  (prn "Chamando a versão >")
  (> valor-bruto 100))
(prn (aplica-desconto? 1000))
(prn (aplica-desconto? 100))
(prn (valor-descontado 1000))
(prn (valor-descontado 100))







(defn mais-caro-que-100?
  [valor-bruto]
  (prn "Deixando claro invocacao de mais-caro-que-100?")
  (> valor-bruto 100))


(defn valor-descontado
  "Retorna o valor com desconto de 10% se deve aplicar desconto."
  [aplica? valor-bruto]
  (if (aplica? valor-bruto)
    (let [taxa-de-desconto (/ 10 100)
          desconto (* valor-bruto taxa-de-desconto)]
      (- valor-bruto desconto))
    valor-bruto))

; High Order Functions - Funções que recebem e/ou retornam funções
(println "Função como parâmetro")
(println (valor-descontado mais-caro-que-100? 1000))
(println (valor-descontado mais-caro-que-100? 100))
(println "Função anônima")
(println (valor-descontado (fn [valor-bruto] (> valor-bruto 100)) 1000))
(println (valor-descontado (fn [valor-bruto] (> valor-bruto 100)) 100))
(println "Função anônima (Lambdas)")
(println (valor-descontado #(> %1 100) 1000))
(println (valor-descontado #(> % 100) 100))

; Definindo um símbolo para uma função
(def mais-caro-que-100? (fn [valor-bruto] (> valor-bruto 100)))
(def mais-caro-que-100? #(> % 100))
(prn (valor-descontado mais-caro-que-100? 1000))
(prn (valor-descontado mais-caro-que-100? 100))
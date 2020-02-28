(ns estoque.learning)

(defn imprime-mensagem []
  (println "------------------------")
  (println "Bem vindo(a) ao estoque!"))
(imprime-mensagem)


(defn aplica-desconto [valor-bruto] ; Nome de função Imperativa
  (* valor-bruto 0.9))
(aplica-desconto 100)


(defn valor-descontado ; Nome de função Declativa, boa prática para Pure Functions
  "Retorna o valor descontado que é 90% do valor bruto."
  [valor-bruto]
  (* valor-bruto 0.9))
(valor-descontado 100)

(defn valor-descontado
  "Retorna o valor com desconto de 10%."
  [valor-bruto]
  (* valor-bruto (- 1 0.10)))
(valor-descontado 100)

(defn valor-descontado
  "Retorna o valor com desconto de 10%."
  [valor-bruto]
  (def desconto 0.10) ; Define um símbolo porém no contexto global do namespace
  (* valor-bruto (- 1 desconto)))
(valor-descontado 100)

(defn valor-descontado
  "Retorna o valor com desconto de 10%."
  [valor-bruto]
  (let [desconto 0.10] ; Define um símbolo local
    (prn "Calculando o desconto de" desconto)
    (* valor-bruto (- 1 desconto))))
(valor-descontado 100)

(defn valor-descontado
  "Retorna o valor com desconto de 10%."
  [valor-bruto]
  (let [desconto (/ 10 100)] ;; Ratio = 1/10
    (prn "Calculando o desconto de" desconto)
    (* valor-bruto (- 1 desconto))))
(valor-descontado 100)

(defn valor-descontado
  "Retorna o valor com desconto de 10%."
  [valor-bruto]
  (let [desconto (double (/ 10 100))] ;; Cast to Double = 0.1
    (prn "Calculando o desconto de" desconto)
    (* valor-bruto (- 1 desconto))))
(valor-descontado 100)

(class 90N) ; clojure.lang.BigInt
(class 90M) ; java.math.BigDecimal

(defn valor-descontado
  "Retorna o valor com desconto de 10%."
  [valor-bruto]
  (let [taxa-de-desconto (/ 10 100)
        desconto (* valor-bruto taxa-de-desconto)]
    (prn "Calculando o desconto de" desconto)
    (- valor-bruto desconto)))
(println
  (valor-descontado 100))



(if (> 500 100)
  (prn "É maior")
  (prn "É menor ou igual"))


(defn valor-descontado
  "Retorna o valor com desconto de 10% se o valor bruto for estritamente maior que 100."
  [valor-bruto]
  (if (> valor-bruto 100)
  (let [taxa-de-desconto (/ 10 100)
        desconto (* valor-bruto taxa-de-desconto)]
    (prn "Calculando o desconto de" desconto)
    (- valor-bruto desconto))
  valor-bruto))
(println (valor-descontado 100))

(ns estoque.aula4)

(def precos [30 700 1000])

(prn (precos 0))
(prn (get precos 0))
(prn (get precos 2))
;(prn (precos 17))
(prn "Valor padrão nil" (get precos 17))
(prn "Valor padrão 0" (get precos 17 0))                                     ; Devolve um valor padrão, neste caso o 0
(prn "Valor padrão 0, mas existe" (get precos 2 0))

(prn (conj precos 5))

(prn precos)

(prn (+ 5 1))
(prn (inc 5))
(prn (update precos 0 inc))
(prn (update precos 1 dec))
(prn precos)




(defn soma-5
  [valor]
  (prn "Estou somando 5 em" valor)
  (+ valor 5))

(prn (update precos 0 soma-5))

(defn aplica-desconto?
  [valor-bruto]
  (> valor-bruto 100))

(defn valor-descontado
  [valor-bruto]
  "Função para pegar o valor descontado"
  (if (aplica-desconto? valor-bruto)
    (let [taxa-de-desconto (/ 10 100)
          desconto (* valor-bruto taxa-de-desconto)]
      (- valor-bruto desconto))
    valor-bruto))

;; MAP
(println "map" (map valor-descontado precos))               ; MAP

;; FILTER
(println (range 10))
(println (filter even? (range 10)))                         ; Devolve apenas os números pares
(println "filter" (filter aplica-desconto? precos))         ; FILTER
(defn filtra-precos-com-desconto
  [colecao-precos]
  (filter aplica-desconto? colecao-precos))

;; REDUCE
(println (reduce + precos))
(println (reduce + (filter aplica-desconto? precos)))
(defn minha-soma
  "Somando os valores"
  [previous next]
  (+ previous next))
(def valor-inicial-soma 0)
(println "Somando com funções customizadas"
         (reduce minha-soma valor-inicial-soma (filtra-precos-com-desconto precos)))
;(reduce minha-soma []) ERROR - Array vazio sem elemento inicial






























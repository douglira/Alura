(ns loja.aula1)


(def nomes ["Douglas" "Lidisse" "Roberto" "Silvana" "Rita" "Irene"])

(println "1" (first nomes))
(println "2" (last nomes))
(println "3" (pop nomes))                                   ; retorna tudo menos o ultimo

(println "4" (rest nomes))                                  ; retorna tudo menos o primeiro
(println "5" (rest []))                                     ; retorna o vetor vazio

(println "6" (next nomes))                                  ; retorna tudo menos o primeiro
(println "7" (next []))                                     ; retorna nulo

(println "8" (seq nomes))
(println "9" (seq []))


(println "\n\n\n MEU MAPA")

(defn meu-mapa
  [fn seq]
  (let [primeiro (first seq)]
    (fn primeiro)
    (meu-mapa fn (rest seq))))
;(meu-mapa println nomes)

(println "\n\n\n MEU MAPA com parada no falsy value")

(defn meu-mapa
  [funcao sequencia]
  (let [primeiro (first sequencia)]
    (if primeiro                                            ; vai parar em qualquer valor falsy
      (do
        (funcao primeiro)
        (meu-mapa funcao (rest sequencia))))))
(meu-mapa println nomes)
(meu-mapa println ["Douglas" "Lidisse" false "Roberto" "Silvana" "Rita" "Irene"])

(println "\n\n\n MEU MAPA com parada no nil")

(defn meu-mapa
  [funcao sequencia]
  (let [primeiro (first sequencia)]
    (if (not (nil? primeiro))
      (do
        (funcao primeiro)
        (meu-mapa funcao (rest sequencia))))))
(meu-mapa println nomes)
(meu-mapa println ["Douglas" "Lidisse" false "Roberto" "Silvana" "Rita" "Irene"])



;(meu-mapa println (range 100000))

(println "\n\n\n MEU MAPA com RECUR")

; TAIL RECURSION - Em uma recursão a função RECUR necessita ser o retorno da função recursiva
; impedindo o empilhamento das chamadas na memória que consequentemente ocorreria um StackOverflow Error
(defn meu-mapa
  [funcao sequencia]
  (let [primeiro (first sequencia)]
    (if (not (nil? primeiro))
      (do
        (funcao primeiro)
        (recur funcao (rest sequencia))))))

;(meu-mapa println (range 100000))













































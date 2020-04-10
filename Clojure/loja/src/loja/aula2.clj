(ns loja.aula2)

(def nomes ["Douglas" "Lidisse" "Roberto" "Silvana" "Rita" "Irene"])

; REDUCE - Implementação própria
(defn conta
  [total-ate-agora elementos]
  (if (not (empty? elementos))
    (recur (inc total-ate-agora) (rest elementos))
    total-ate-agora))


;(println (conta 0 nomes))


; REDUCE - Com mais de uma aridade (neste caso 2 aridades).
(defn conta
  ([elementos] (conta 0 elementos))
  ([total-ate-agora elementos] (if (not (empty? elementos))
                                 (recur (inc total-ate-agora) (rest elementos))
                                 total-ate-agora)))

(println "#1 Conta - " (conta nomes))



; Recorrencia dentro da função (utilizando o LOOP) permite com que o código anterior não
; seja executado junto ao loop, porém não é uma boa prática pois significa que sua função
; está se tornando mais complexa (aumento da complexidade ciclomátiva) o que necessita
; quebrar/segregar um pouco do código para deixá-lo mais simples
(defn conta
  [elementos]
  (println "Este print não está dentro da recorrência portanto é executado apenas uma vez")
  (loop [total-ate-agora 0
         elementos-restantes elementos]

    (if (not (empty? elementos-restantes))
      (recur (inc total-ate-agora) (next elementos-restantes))
      total-ate-agora)))

(println "#2 Conta - " (conta nomes))
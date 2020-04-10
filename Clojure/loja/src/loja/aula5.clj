(ns loja.aula5
  (:require
    [loja.db :as l.db]
    [loja.logic :as l.logic]))

(defn gastou-bastante? [info-do-usuario]
  (> (:preco-total info-do-usuario) 400))


; Keep se assemelha na junção de um map com filter, pois ele retorna um
; array mapeado, porém apenas os valores não nulos (nil). De forma informal,
; se quiser remover algum elemento do mapeamento basta retornar nulo (nil)
(let [pedidos (l.db/todos-os-pedidos)
      resumo (l.logic/resumo-por-usuario pedidos)]
  (println "#1 Keep" (keep gastou-bastante? resumo))
  )


(defn gastou-bastante? [info-do-usuario]
  (println "gastou-bastante?" (:usuario-id info-do-usuario))
  (> (:preco-total info-do-usuario) 400))

(let [pedidos (l.db/todos-os-pedidos)
      resumo (l.logic/resumo-por-usuario pedidos)]
  (println "#2 Keep" (keep gastou-bastante? resumo))
  ;(println "#3 Filter" (filter gastou-bastante? resumo))
  )


(defn filtro1 [x]
  (println "filtro1" x)
  x)

(println (map filtro1 (range 10)))

(defn filtro2 [x]
  (println "filtro2" x)
  x)

(println (map filtro2 (map filtro1 (range 10))))

; map é lazy
(->> (range 50)
     (map filtro1)
     (map filtro2)
     println)

































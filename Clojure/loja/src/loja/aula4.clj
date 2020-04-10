(ns loja.aula4
  (:require
    [loja.db :as l.db]
    [loja.logic :as l.logic]))

(let [pedidos (l.db/todos-os-pedidos)
      resumo (l.logic/resumo-por-usuario pedidos)]
  (println "#1 Resumo" resumo)
  (println "#2 Ordenado" (sort-by :preco-total resumo))
  (println "#3 Ordenado ao contrário" (reverse (sort-by :preco-total resumo)))
  (println "#4 Ordenado por ID" (sort-by :usuario-id resumo))

  (println "#5" (get-in pedidos [0 :itens :mochila :quantidade])))



(defn resumo-ordenado-por-usuario [pedidos]
  (->> pedidos
       l.logic/resumo-por-usuario
       (sort-by :preco-total)
       reverse))



(let [pedidos (l.db/todos-os-pedidos)
      resumo (resumo-ordenado-por-usuario pedidos)]
  (println "#6 Resumo" resumo)
  (println "#7 Primeiro" (first resumo))
  (println "#8 Segundo" (second resumo))
  (println "#9 Resto" (rest resumo))
  (println "#10 Total" (count resumo))
  (println "#11 Class" (class resumo))
  (println "#12 nth 1" (nth resumo 1))                      ; segundo elemento
  (println "#13 get" (get resumo 1))
  (println "#14 take" (take 2 resumo)))

(def top-3 #(take 3 %))

(let [pedidos (l.db/todos-os-pedidos)
      resumo (resumo-ordenado-por-usuario pedidos)]
  (println "#15 top-3" (top-3 resumo)))


(let [pedidos (l.db/todos-os-pedidos)
      resumo (resumo-ordenado-por-usuario pedidos)]
  (->> resumo
       (filter #(> (:preco-total %) 400))
       (println  "#16 Filter Maior que 400"))
  (->> resumo
       (some #(> (:preco-total %) 400))
       (println  "#17 Some Maior que 400")))





























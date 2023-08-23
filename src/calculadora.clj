
;; o bloco abaixo define um array de objetos de nome input com chaves product-name, price e quantity e seus respectivos valores.
(def input
  [{:product-name "p1" :price 1 :quantity 10}
   {:product-name "p2" :price 1.2 :quantity 7}
   {:product-name "p3" :price 0.3 :quantity 2}])

;; o bloco abaixo define uma função de nome calculate-total com um parametro product, e no corpo da função desestrutura as chaves preco e quantidade do objeto passado como argumento para posteriormente gerar a multiplicacao. Na linha seguinte adiciona uma chave nova de nome total ao objeto product e define seu valor dentro dos parenteses, sendo este a multiplicação de price e quantity que foram extraídos da desestruturacao do objeto product.
(defn calculate-total [product]
  (let [{:keys [price quantity]} product]
    (assoc product :total (* price quantity))))

;; o bloco abaixo define uma variavel de nome products-with-total e atribui a ela um map com cada item do array input, e para cada item executar a funcao calculate-total com os valores individuais de price e quantity e atribuir o total de cada objeto à chave total do objeto.
(def products-with-total
  (map calculate-total input))

;; equivalente ao console.log exibe os resultados no console.
(prn products-with-total)


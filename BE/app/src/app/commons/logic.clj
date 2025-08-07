(ns app.commons.logic
  (:require [app.utils :as u]
            [clojure.pprint :refer [pprint]]))

(defn generic-ordering
  "Ordering a list of maps based on the order of their ids"
  [entities ordered-ids]
  (loop [[id & ids] ordered-ids res []]
    (if id
      (let [entity (first (filter #(= (:_id %) id) entities))]
        (recur ids (conj res entity)))
      res)))

(defn get-valid-params?
  [params required-fields]
  (every?
   (fn [key]
     (let [field-value (get-in params [key])]
       (and (some? field-value) (seq field-value))))
   required-fields))

(defn post-valid-params?
  [query-params required-fields]
  (every?
   (fn [field-key]
     (let [field-value (get-in query-params [field-key])]
       (some? field-value)))
   required-fields))

(defn get-write-result
  "Get write result when doing create, update, and delete operations to mongoDB"
  [res]
  {:n (.getN res) 
   :updateOfExisting (.isUpdateOfExisting  res) 
   :upsertedId (.getUpsertedId  res)})


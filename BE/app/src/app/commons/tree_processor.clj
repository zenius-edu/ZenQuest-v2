(ns app.commons.tree-processor
  (:require [app.utils :as u]
            [clojure.string :as c]))

;; Transforming flat data structure into tree and vice versa
;; Normally used for container-groups, skill-groups, and content-folders
(defn flatten-tree
  "Recursive function to flatten a tree into a flat data structure with children only at one level down,
   and children containing only their IDs. Returns a vector."
  ([data parent-id]
   (let [children (:children data)]
     (if (empty? children)
       [(assoc data :parent parent-id)]
       (let [new-data (assoc data :parent parent-id)]
         (vec (concat [new-data] (mapcat #(flatten-tree % (:_id data)) children)))))))
  ([data]
   (let [children (:children data)]
     (if (empty? children)
       [data]
       (let [new-data (dissoc data :children)]
         (vec (concat [new-data] (mapcat #(flatten-tree % (:_id data)) children))))))))

(defn tree->flat
  "Transforms a tree into a flat data structure with children only at one level down,
   and children containing only their IDs. Returns a vector."
  [data]
  (vec (mapcat #(flatten-tree %) data)))

(defn find-children
  "Find the children of a node in a flat data structure, sort by order"
  [flattened parent]
  (->> (filterv #(= (:parent %) parent) flattened)
       (sort-by :order)))

(defn unflatten
  [flattened item]
  (let [children (find-children flattened (:_id item))]
    (assoc item :children (mapv #(unflatten flattened %) children))))

(defn flat->tree
  "Transforms a flat data structure into a tree. Returns a vector."
  [data]
  (let [roots (find-children data nil)]
    (mapv #(unflatten data %) roots)))

(defn cg-paths
  "Finding paths to the outermost parents from a node, returns array of id"
  [data node]
  (vec
    (loop [cg-id (:_id node) node-data node res []]
      (let [parent-data (first (filter #(= (:_id %) (:parent node-data)) data))]
        (if parent-data
          (recur (:_id parent-data) parent-data (cons cg-id res))
          (cons cg-id res))))))

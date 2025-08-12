(ns user
  (:require [clojure.tools.namespace.repl :refer [refresh]]
            [app.login.usecase :as login]
            [app.utils :as u]))

(defn dev
  []
  (require '[dev])
  (in-ns 'dev))

(comment
  (dev)

  (dev/start)

  (-> @dev/dev-system :dbase :db-zenquest)

  (def user (login/get-user-by-email (-> @dev/dev-system :dbase) "bagas.prima@zenius.com"))

  (u/create-token user)

  dev/dev-system
  )


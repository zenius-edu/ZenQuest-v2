(ns app.plumbing.db
  (:require
   [com.stuartsierra.component :as component]
   [monger.collection :as mc]
   [app.utils :as u]
   [monger.core :as mg]
   [app.plumbing.db :as db]))

(defrecord Dbase [db-mongo-config]
  component/Lifecycle
  (start [this]
    (u/info "Starting the database component with the following key")
    (u/pres
     db-mongo-config
     #_(keys db-mongo-config))
    (let [conn-zenquest (mg/connect (assoc db-mongo-config :uri
                                           (:db-mongo-uri-zenquest db-mongo-config)))
          db-zenquest (mg/get-db conn-zenquest (:db-mongo-zenquest db-mongo-config))]
      (u/info "Starting the database and the dbref")
      (merge this {:conn-zenquest conn-zenquest
                   :db-zenquest   db-zenquest})))
  (stop [this]
    (mg/disconnect (:conn-zenquest this))
    (u/info "Database stopped")
    (dissoc this :db-zenquest)))

(defn create-database-component [db-mongo-config]
  (map->Dbase {:db-mongo-config db-mongo-config}))









(ns app.login.usecase
  (:require
    [app.utils :as u]
    [monger.collection :as mc]))

(defn register
  "Register a newly logged in user"
  [db user-data]
  (let [tba-user-data (assoc user-data
                        :approved false
                        :created-at (u/now)
                        :last-active (u/now)
                        :role "learner"
                        :token (u/uuid)
                        :_id (u/uuid))
        ins-db (mc/insert-and-return (:db-zenquest db) "creds" tba-user-data)]
    (u/info "User registered")
    (u/pres ins-db)
    ins-db))

(defn auth-user
  "Authorise user by checking its token & approved status"
  [db user-data]
  (let [user-email (:email user-data)]
    (u/info "Masuk ke sso login -> auth-user")
    (u/info "user-data:" user-data)
    (if-let [db-user-data (mc/find-one-as-map (:db-zenquest db) "creds" {:email user-email})]
      (if (:approved db-user-data)
        {:status    "ok"
         :message   "Login successful"
         :user-data db-user-data}
        {:status    "unapproved"
         :message   "Waiting for approval"
         :user-data db-user-data})
      (let [res (register db user-data)]
        {:status    "waiting"
         :message   "Waiting for approval"
         :user-data res}))))

(comment 
  (auth-user (-> @dev/dev-system :dbase) {:name "Bagas Prima" :email "bagas.prima@zenius.com" :role "admin", :approved true})
)


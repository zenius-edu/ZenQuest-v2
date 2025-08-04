(ns app.login.ctrl
  (:require
    [app.utils :as u]
    [app.login.usecase :as usecase]))

(defn sso-login
  "Login using sso"
  [db request]
  (u/info "Masuk ke sso-login")
  (let [user-data (get-in request [:body])
        auth-result (usecase/auth-user db user-data)]
    
    (case (:status auth-result)
      "ok" {:status  200
            :headers {"Content-Type" "application/json"}
            :body    auth-result}
      
      "unapproved" {:status  403
                    :headers {"Content-Type" "application/json"}
                    :body    auth-result}
      
      "waiting" {:status  401
                 :headers {"Content-Type" "application/json"}
                 :body    auth-result})))
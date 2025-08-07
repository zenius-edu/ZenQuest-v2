(ns app.login.ctrl
  (:require
    [app.utils :as u]
    [app.login.usecase :as usecase]))

(defn test-login
  "Login using sso"
  [db request]
  (u/info "Masuk ke sso-login")
  (let [{:keys [access-token email name] :as user-data} (get-in request [:body :data])
        verified-data (usecase/verify-google-credentials db access-token)
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

(defn login-or-register-google
  "Login using google access token"
  [db request]
  (u/info "Getting into login-token controller")
  (let [{:keys [access-token email name]} (get-in request [:body :data])
        ;; _ (usecase/verify-google-credentials db access-token)
        user-data {:email email
                   :name name}]
    (if access-token 
    {:status 200
     :body   {:message   "Login successful"
              :token     (u/create-token (assoc user-data :exp (u/epoch-time (* 60 60 24 30))))
              :user-data user-data}}
    {:status 400
     :body   {:message   "Missing access-token"}}) 
    ))
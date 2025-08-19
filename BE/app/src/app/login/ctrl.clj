(ns app.login.ctrl
  (:require
    [app.utils :as u]
    [app.login.usecase :as usecase]
    [monger.collection :as mc]))

(defn login-or-register-google
  "Handler for login or registration via Google OAuth.
   Validates the incoming request for a token and passes it to the use case.
   Returns a 200 or 201 on success, 400 for bad requests, and 500 for internal errors."
  [db request]
  (if-let [token (get-in request [:body :token])]
    (try
      (let [{:keys [new-user? error] :as result} (usecase/login-or-register-google db token)]
        (if error
          {:status 401 :body result}
          (let [user-data (:user-data result)
                response-body {:token (:token result)
                               :refresh-token (:refresh-token result)
                               :user-data user-data
                               :message (if new-user?
                                          "User registered and logged in successfully"
                                          "Login successful")}]
            {:status (if new-user? 201 200)
             :body response-body})))
      (catch Exception e
        (u/error e "Error processing Google login")
        {:status 500 :body {:message "Internal server error"}}))
    {:status 400 :body {:message "Missing token in request"}}))

(defn get-current-user
  [db request]
  (try
    (if-let [result (usecase/get-current-user db request)]
      {:status 200 :body result}
      {:status 401 :body {:message "Invalid or expired token"}})
    (catch Exception e
      (u/error e "Error fetching current user")
      {:status 500 :body {:message "Internal server error"}})))

(defn refresh-token
  [db request]
  (try
    (let [body (:body request)
          refresh (:refresh-token body)]
      (if (not refresh)
        {:status 400 :body {:message "Missing refresh-token in request"}}
        (let [result (usecase/refresh-access-token db refresh)]
          (if (:token result)
            {:status 200 :body result}
            {:status 401 :body {:message "Invalid or expired token"}}))))
    (catch Exception e
      (u/error e "Error refreshing token")
      {:status 500 :body {:message "Internal server error"}})))
    
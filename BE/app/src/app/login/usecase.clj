(ns app.login.usecase
  (:require
    [app.utils :as u] 
    [clj-http.client :as http]
    [monger.collection :as mc]) 
  (:import
   [java.time Instant]))

(defn register
  "Register a newly logged in user"
  [db user-data]
  (let [tba-user-data (assoc user-data
                        :approved false
                        :created-at (u/now)
                        :last-active (u/now)
                        :role "learner"
                        :_id (u/uuid))
        ins-db (mc/insert-and-return (:db-zenquest db) "creds" tba-user-data)]
    (u/info "User registered")
    (u/pres ins-db)
    ins-db))

(defn register-user
  "Register a newly logged in user to users"
  [db user-data & [user-id]]
  (let [new-id (or user-id (u/uuid))
        tba-user-data (assoc user-data
                             :created-at (u/now)
                             :updated-at (u/now)
                             :_id new-id
                             :universal-learning-id new-id
                             :last-login-at (Instant/now)
                             :active? true
                             :email-verified? true)
        ins-db (mc/insert-and-return (:db-zenquest db) "creds" tba-user-data)]
    (u/info "User registered")
    (u/pres ins-db)
    ins-db))

(defn validate-access-token
  "Validates the access token with Google and retrieves the associated email if valid."
  [access-token]
  (u/info "Validating google access token")
  (try
    (let [response (http/get "https://www.googleapis.com/oauth2/v1/tokeninfo"
                             {:query-params {"access_token" access-token}
                              :as           :json})
          data (-> response :body)]
      (if (= 200 (:status response))
        (if (:email data)
          {:email    (:email data)
           :verified (:verified_email data)}
          {:error :no-email-associated})
        {:error :validation-failed}))
    (catch Exception e
      (u/error e "Failed to validate access token")
      {:error :exception-error})))

(defn verify-google-credentials
  "Find and validate user using Google OAuth token. Returns user data if valid,
   or error map if validation fails or user status checks don't pass."
  [db access-token]
  (if-let [{:keys [email verified] :as token-info} (validate-access-token access-token)]
    (if (:error token-info)
      {:error {:type (:error token-info)}}                  ; Google token validation failed
      (if-let [user (mc/find-one-as-map (:db-zenquest db)
                                        "users" {:email email})]
        (cond
          (not verified) {:error {:type :unverified}}
          (not (:active? user)) {:error {:type :inactive}}
          :else user)                                       ;return user data
        {:error {:type :not-registered}}))                  ; User not in our database
    {:error {:type :token-validation-failed}}))             ; Failed to get token info

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
         :user-data db-user-data
         :token (u/create-token db-user-data)}
        {:status    "unapproved"
         :message   "Waiting for approval"
         :user-data db-user-data
         :token (u/create-token db-user-data)})
      (let [res (register db user-data)]
        {:status    "waiting"
         :message   "Waiting for approval"
         :user-data res
         :token (u/create-token res)}))))

(comment 
  (auth-user (-> @dev/dev-system :dbase) {:name "Bagas Prima" :email "bagas.prima@zenius.com" :role "admin", :approved true})
)


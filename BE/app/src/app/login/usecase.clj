(ns app.login.usecase
  (:require
    [app.utils :as u]
    [clj-http.client :as http]
    [monger.collection :as mc])
  (:import
   [java.time Instant]))

(defn- register-user
  "Register a newly logged in user to users"
  [db user-data & [user-id]]
  (let [new-id (or user-id (u/uuid))
        tba-user-data (assoc user-data
                             :created-at (u/now)
                             :updated-at (u/now)
                             :_id new-id
                             :universal-learning-id new-id
                             :last-login-at (str (Instant/now))
                             :active? true
                             :email-verified? true)
        ins-db (mc/insert-and-return (:db-zenquest db) "users" tba-user-data)]
    (u/info "User registered into 'users' collection.")
    (u/pres ins-db)
    ins-db))

(defn get-user-by-email
  "Retrieves a user profile from the database by email."
  [db email]
  (u/info "Fetching user profile from 'users' for email:" email)
  (mc/find-one-as-map (:db-zenquest db) "users" {:email email}))

(defn validate-access-token
  "Validates the access token with Google and retrieves user info if valid."
  [access-token]
  (u/info "Validating google access token and fetching user info")
  (try
    (let [response (http/get "https://www.googleapis.com/oauth2/v3/userinfo"
                             {:headers {"Authorization" (str "Bearer " access-token)}
                              :as      :json})
          data (-> response :body)]
      (if (= 200 (:status response))
        (if (:email data)
          {:email    (:email data)
           :name     (:name data)
           :picture  (:picture data)
           :verified (:email_verified data)}
          {:error :no-email-associated})
        {:error :validation-failed}))
    (catch Exception e
      (u/error e "Failed to validate access token")
      {:error :exception-error})))

(defn login-or-register-google
  "Business logic for logging in or registering a user via Google OAuth.
   Validates the Google access token, finds an existing user, or registers a new one.
   Returns user data map on success, or an error map on failure."
  [db access-token]
  (let [google-validation (validate-access-token access-token)]
    (u/info google-validation) 
    (u/info "======= validation complete ============")
    (if (:error google-validation)
      {:error {:message "Invalid Google token" 
               :details (:error google-validation)}}
      (let [email (:email google-validation)
            user (mc/find-one-as-map (:db-zenquest db) "users" {:email email})]
        (if user
          {:new-user? false
           :token (u/create-token (assoc user :exp (u/epoch-time (* 60 60 24 30))))
           :user-data user}
          (let [new-user-data {:email email
                               :name (or (:name google-validation) "New ZenQuest User")}
                new-user (register-user db new-user-data)]
            {:new-user? true
             :token (u/create-token (assoc new-user :exp (u/epoch-time (* 60 60 24 30))))
             :user-data new-user}))))))

(comment
  (register-user (-> @dev/dev-system :dbase) {:name "Bagas Prima" :email "bagas.prima@zenius.com" :role "admin", :approved true}))

(defn get-current-user
  [db request]
  (let [user-id (get-in request [:user :_id])]
    (u/info "getting user from db with id: " user-id)
    (-> (mc/find-one-as-map (:db-zenquest db) "users" {:_id user-id})
        (u/pres))))


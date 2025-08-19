(ns app.login.routes
  (:require
    [app.utils :refer :all]
    [app.commons.web :as web]
    [app.login.ctrl :as login]))

(defn api-routes
  [db midware]
  ["/login"
   ["/google" {:post (partial login/login-or-register-google db)}]
   ["/me" {:get (partial midware login/get-current-user db)}]
   ["/refresh" {:post (partial login/refresh-token db)}]])

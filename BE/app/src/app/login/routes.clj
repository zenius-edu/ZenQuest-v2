(ns app.login.routes
  (:require
    [app.utils :refer :all]
    [app.login.ctrl :as login]))

(defn api-routes
  [db]
  ["/login"
   ["/google" {:post (partial login/login-or-register-google db)}]
   ["/test" {:post (partial login/test-login db)}]])

(ns app.login.routes
  (:require
    [app.utils :refer :all]
    [app.login.ctrl :as login]))

(defn api-routes
  [db]
  ["/login"
   ["/sso-login" {:post (partial login/sso-login db)}]])

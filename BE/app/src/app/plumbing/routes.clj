(ns app.plumbing.routes
  (:require [reitit.ring :as ring]
            [clj-http.client :as http]
            [app.commons.web :as web]
            [app.utils :as u]
            [app.login.routes :as login]
            [app.quest.routes :as quest]
           ))

(defn api-check
  "Helper function for testing api"
  [db request]
  {:status  200
   :headers {"Content-Type" "application/json"}
   :body    {:status  "ok"
             :message "API is running fine"}})

(defn api
  "APIs specifically for backsite needs"
  [db openai midware]
  (u/info "Getting into backsite-api")
  ["/api"
   ["/v1"
    ["" {:get (partial api-check db)}] 
    (login/api-routes db midware) 
    (quest/api-routes db openai midware)
    ]])

(defn create-routes
  "Creates the whole routes for the system"
  [db openai perplexity]
  (ring/router
   [["/" {:get (partial api-check db)}]
    (api db openai  web/backware)]))



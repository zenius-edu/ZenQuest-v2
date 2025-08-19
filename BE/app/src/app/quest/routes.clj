(ns app.quest.routes
  (:require
    [app.utils :refer :all]
    [app.quest.ctrl :as quest]))

(defn api-routes
  [db openai midware]
  ["/quest"
   ["/list" {:get (partial midware quest/list-quests db openai)}]
   ["/generate" {:post (partial midware quest/generate-quest db openai)}] 
   ["/generate-audio" {:post (partial midware quest/generate-audio db openai)}]
   ["/start" {:post (partial midware quest/start-session db openai)}]
   ["/submit" {:post (partial midware quest/submit-answers db openai)}]])

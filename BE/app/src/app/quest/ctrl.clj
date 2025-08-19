(ns app.quest.ctrl
  (:require
   [app.utils :as u]
   [app.quest.usecase :as usecase]
   [clojure.string :as str] 
   [clojure.java.io :as io])
  (:import (java.io File)))


(defn generate-quest
  "Generate quest"
  [db openai request]
  (u/info "== generate-quest ==")
  (let [req (get-in request [:body])
        resp (usecase/generate-quest db openai req)]
    (case (:status resp)
      "ok" {:status  200
            :headers {"Content-Type" "application/json"}
            :body    resp} 
      {:status  500
       :headers {"Content-Type" "application/json"}
       :body    resp})))


(defn start-session
  "Start practice session"
  [db openai request]
  (u/info "== starting session ==")
  (let [req (get-in request [:body])
        claims (:user request)
        learner-id (or (:universal-learning-id claims)
                        (:_id claims)
                        (:learner-id req))
        quest-id (or (:quest-id req)
                     (get-in request [:params :quest-id]))
        _ (u/info "learner-id:" learner-id)
        _ (u/info "quest-id:" quest-id)
        resp (usecase/start-session db openai {:learner-id learner-id
                                              :quest-id quest-id
                                              :payload req})]
    (case (:status resp)
      "ok" {:status  200
            :headers {"Content-Type" "application/json"}
            :body    resp}
      {:status  500
       :headers {"Content-Type" "application/json"}
       :body    resp})))

(defn generate-audio
  [db openai request]
  (u/info "Getting into process-audio-controller")
  (try
    (let [audio-file (-> request :multipart-params (get "audio"))
          learner-id (-> request :params :learner-id) 
          course-name (-> request :params :course-name)
          original-name (:filename audio-file)
          extension (last (str/split original-name #"\."))
          proper-temp-file (File/createTempFile "audio-" (str "." extension))
          _ (io/copy (:tempfile audio-file) proper-temp-file)
          ;; Update audio-file map with proper temp file
          final-temp-file (assoc audio-file :tempfile proper-temp-file)
          wrap-cleanup (fn [response]
                         (do
                           (io/delete-file (:tempfile audio-file) true)
                           (io/delete-file proper-temp-file true)
                           response))]
      (if (and audio-file learner-id course-name
               (some #(str/ends-with?
                       (str/lower-case (-> audio-file :filename))
                       %)
                     [".mp3" ".m4a" ".wav"]))               ; Support multiple audio formats
        (if-let [result (usecase/transcribe-audio db openai final-temp-file learner-id course-name)]
          (wrap-cleanup
           {:status 200
            :body   {:status  "ok"
                     :message "Audio processed successfully"
                     :data    result}})
          (wrap-cleanup
           {:status 400
            :body   {:status  "error"
                     :message "Failed to process audio"}}))
        (wrap-cleanup
         {:status 400
          :body   {:status  "error"
                   :message "Invalid or missing audio file, company-id, or last-updated-by"}})))
    (catch Exception e
      (u/error "Error in controller:" (.getMessage e))
      {:status 500
       :body   {:status  "error"
                :message "Internal server error"}})))


(ns app.quest.usecase
  (:require
   [app.utils :as u]
   [monger.collection :as mc]
   [clojure.java.io :as io]))

(defn generate-speech-to-text
  "Generate speech to text"
  [openai soundfile]
  (u/info "Generating speech to text")
  (u/pres soundfile)
  "this is the new text")

(defn generate-quest
  "Authorise user by checking its token & approved status"
  [db openai request]
  (try
    (let [is-sound? (= (:type request) "sound")
          prompt-text (cond
                        is-sound? (generate-speech-to-text openai (:soundfile request))
                        :else (:prompt request))]
      (u/info "Generating quest")
      (u/pres prompt-text)
      {:status "ok"
       :message "Quest generated"
       :prompt prompt-text})

    (catch Exception e
      (u/error "Error generating quest" e)
      {:status "error"
       :message "Error generating quest"
       :error e})))

(defn start-session
  "Start practice session"
  [db openai request]
  (try
    (let [learner-id (:learner-id request)
          quest-id (:quest-id request)]
      (u/info "Starting session")
      (u/info "learner-id: " learner-id)
      (u/info "quest-id: " quest-id)
      {:status "ok"
       :message "Session started"
       :learner-id learner-id
       :quest-id quest-id})

    (catch Exception e
      (u/error "Error starting quest" e)
      {:status "error"
       :message "Error starting quest"
       :error e})))

(defn transcribe-audio
  "Process audio file with OpenAI STT and return result with metadata"
  [db openai-comp audio-file learner-id course-name]
  (try
    (let [temp-file (-> audio-file :tempfile)
          model "gpt-4o-mini-transcribe"
          raw-stt-result ((:openai-stt openai-comp) {:audio-file temp-file 
                                                     :model model})
          stt-result (-> raw-stt-result :result :text)]
      ;; Cleanup temp file
      (io/delete-file temp-file true)
      (u/info raw-stt-result)
      (u/info "Text sucesssfully processed for: " learner-id " " course-name)
      {:learner-id learner-id
       :course-name course-name
       :prompt (if stt-result
                 stt-result
                 "Text could not be parsed somehow..")})

    (catch Exception e
      (u/error "Error processing audio:" (.getMessage e))
      nil)))

(comment)


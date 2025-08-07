(ns app.plumbing.openai
  (:require
   [com.stuartsierra.component :as component]
   [app.utils :as u]
   [clj-http.client :as http]
   [cheshire.core :as json]
   [clojure.java.io :as io]))

(declare base-request generate transcribe models)

;; this is the component openai with basic setting of openai
;; returns the generator function

(defrecord Openai [openai-url openai-stt openai-key]
  component/Lifecycle
  (start [this]
    (u/info "Setting up the openai component")
    (u/info {:openai-url openai-url
               :openai-stt openai-stt
               :openai-key openai-key})
    (assoc this
           :openai (fn [{:keys [model messages]}]
                     (u/info "Generating from openai")
                     (let [send-to-openai {:model      model
                                           :openai-url (str openai-url)
                                           :messages   messages
                                           :openai-key (str openai-key)
                                           :type       "completion"}]
                       (generate send-to-openai)))
           
           :openai-stt (fn [{:keys [audio-file prompt model]}]
                         (u/info "Generating from openai speech to text...")
                         (let [base-req {:model      (or model "whisper-1")
                                         :openai-url (str openai-stt)
                                         :file       audio-file
                                         :openai-key (str openai-key)
                                         :type       "tts"}
                               send-to-openai (if prompt
                                                (assoc base-req :prompt prompt)
                                                base-req)]
                           (transcribe send-to-openai)))))
  (stop [this]
    (u/info "Openai stopped")
    this))

(defn create-openai-component
  "Openai component constructor"
  [{:keys [openai-url openai-stt openai-key]}]
  (map->Openai {:openai-url openai-url
                :openai-stt openai-stt
                :openai-key openai-key}))

(defn base-request
  [api-token type]
  (condp = type
    "completion" {:accept       :json
                  :content-type :json
                  :headers      {"Authorization" (str "Bearer " api-token)}
                  :conn-timeout 10000
                  :socket-timeout 300000}
    "tts" {:accept  :json
           ;:content-type :multipart/form-data
           :headers {"Authorization" (str "Bearer " api-token)
                     ;"Content-Type" "multipart/form-data"
                     }}))

(def models
  {"gpt-4o"       "gpt-4o"
   "gpt-o3-mini" "gpt-o3-mini"
   "gpt-o3"      "gpt-o3"
   "gpt-4o-mini" "gpt-4o-mini"
   "gpt-o4-mini" "gpt-o4-mini"
   "o1-mini"     "o1-mini"
   "whisper-1"   "whisper-1"
   "gpt-4o-transcribe" "gpt-4o-transcribe"
   "gpt-4o-mini-transcribe" "gpt-4o-mini-transcribe"})

;;;------
(def new-models
  {"gpt-4o"            {:req-enum   "gpt-4o"
                        :max-tokens 16384}
   "gpt-4o-mini"       {:req-enum   "gpt-4o-mini"
                        :max-tokens 16384}
   "o1-preview"        {:req-enum   "o1-preview"
                        :max-tokens 32000}
   "o1-mini"           {:req-enum   "o1-mini"
                        :max-tokens 65000}
   "o1"                {:req-enum   "o1"
                        :max-tokens 100000}
   "o1-2024-12-17"     {:req-enum   "o1-2024-12-17"
                        :max-tokens 100000}
   "gpt-o3"                {:req-enum   "o3"
                            :max-tokens 100000}
   "gpt-o3-mini"           {:req-enum   "o3-mini"
                            :max-tokens 100000}
   "gpt-o4-mini"           {:req-enum   "o4-mini"
                            :max-tokens 100000}
   "deepseek-chat"     {:req-enum   "deepseek-chat"
                        :max-tokens 8192}
   "deepseek-reasoner" {:req-enum   "deepseek-reasoner"
                        :max-tokens 8192}})

(defn model-config
  "Based on the model enum, fetch the model info and return the model configuration"
  [model messages schema]
  (if (nil? model)
    {:error {:type    :empty-model
             :message "Model cannot be nil"}}

    (if-let [{:keys [req-enum max-tokens]} (get new-models model)]
      (case req-enum
        ;; Regular O1 versions
        ("o1" "o1-2024-12-17" "o3-mini" "o3" "o4-mini")

        {:model                 req-enum
         :messages              messages
         :max_completion_tokens max-tokens
         :response_format (or schema {:type "json_object"})}

        ("o1-preview" "o1-mini")
        {:model                 req-enum
         :messages              messages
         :max_completion_tokens max-tokens}

        "deepseek-chat"
        {:model           req-enum
         :messages        messages
         :response_format (or schema {:type "json_object"})
            ;:temperature     0.21
         :max_tokens      max-tokens}

        "deepseek-reasoner"
        {:model           req-enum
         :messages        messages
         :response_format {:type "text"}                   ;;blm bisa pake json_object
         :max_tokens      max-tokens}

        ;; default case for GPT and others
        {:model           req-enum
         :messages        messages
         :response_format (or schema {:type "json_object"})
         :max_tokens      max-tokens
         :temperature     0.21
         :n               1})

      {:error {:type    :invalid-model
               :message (str "Model " model " is not supported")
               :model   model}})))
;;;------


(defn generate
  "Just call this one to generate the response from openAI"
  [{:keys [model openai-url messages openai-key type] :as send-to-openai}]
  (u/info "Getting into generate function inside openai component")
  (let [data (model-config model messages nil)]
    (u/info "Sending to openai...")
    ;(u/pres data)
    (let [resp (try (->> data
                         (json/generate-string)
                         (assoc (base-request openai-key type) :body)
                         (http/post openai-url))
                    (catch Exception e (u/error e)))]
      ;(u/pres resp)
      (let [resp1 (-> (:body resp)
                      (json/parse-string true))]
        ;(u/pres resp1)
        (-> (select-keys resp1 [:usage])
            (assoc :result (-> (get-in resp1 [:choices 0 :message :content])
                               (json/parse-string true))))))))

(defn transcribe
  "Just call this one to transcribe the audio file from openAI"
  [{:keys [model openai-url file openai-key type prompt]}]
  (u/info "=======================================================")
  (u/info "Getting into transcribe function inside openai component")
  (u/info "model: " model)
  (let [file-obj (io/file file)
        base-multipart [{:name     "file"
                         :content  file-obj
                         :filename (.getName file-obj)}
                        {:name    "model"
                         :content model}
                        {:name    "response_format"
                         :content "json"}
                        {:name    "temperature"
                         :content "0.21"}]
        prompt-multipart (if prompt
                           (conj base-multipart {:name    "prompt"
                                                 :content prompt})
                           base-multipart)
        req (merge
             (base-request openai-key type)
             {:multipart prompt-multipart})
        resp (do
               ;(u/pres req)
               (try
                 (http/post openai-url
                            req)
                 (catch Exception e (u/error e))))]
    (let [resp1 (-> (:body resp)
                    (json/parse-string true))]
      ;TODO check the result and adjust to avoid too many nested maps confusion
      {:result resp1
       :usage  (:usage resp1)})))

#_(defn transcribe
    "Just call this one to transcribe the audio file from openAI"
    [{:keys [model openai-url file openai-key type] :as send-to-openai}]
    (u/info "Getting into transcribe function inside openai component")

    (let [data {:model       (models model)
                :file        file
                :temperature 0.21}]
      (u/info "Sending to openai...")
      (let [resp (try (->> data
                           (json/generate-string)
                           (assoc (base-request openai-key type) :body)
                           (http/post openai-url))
                      (catch Exception e (u/error e)))]
        (u/pres resp)
        (let [resp1 (-> (:body resp)
                        (json/parse-string true))]
          (u/pres resp1)
          (-> (select-keys resp1 [:usage])
              (assoc :result (-> (get-in resp1 [:choices 0 :message :content])
                                 (json/parse-string true))))))))

(comment
  (println (.exists (io/file "resources/test-audio.m4a")))

  (keys (:openai @dev/dev-system))

  ((:openai (:openai @dev/dev-system)) {:model "gpt-o4-mini" :messages [{:role    "system"
                                                                         :content "I will always respond with short answer in JSON object"}
                                                                        {:role    "user"
                                                                         :content "What is the meaning of life?"}]})

  ((:openai-stt (:openai @dev/dev-system)) {:audio-file (io/file "resources/test-audio.m4a")})

  ((:openai-stt (:openai @dev/dev-system)) {:audio-file (io/file "resources/test-audio.m4a")
                                            :prompt     "The transcript is about a company KokBisa that makes educational video"})

  (defn generate-o1
    "Just call this one to generate the response from openAI"
    [{:keys [model openai-url messages openai-key type] :as send-to-openai}]
    (u/info "Getting into generate function inside openai component")
    (let [default (if (= "o1-mini" (:o1-mini models))
                    {:max_completion_tokens 32000}
                    {:max_tokens      16000
                     :response_format {:type "json_object"}})
          data (merge {:model    (models model)
                       :messages messages
                       ;:max_tokens      16000
                       ;:temperature     0.21
                       :n        1}
                      default)]
      (u/info "Sending to openai...")
      (u/pres data)
      (let [resp (-> (try (->> data
                               (json/generate-string)
                               (assoc (base-request openai-key type) :body)
                               (http/post openai-url))
                          (catch Exception e (u/error e))))]
        ;(u/pres resp)
        (let [resp1 (-> (:body resp)
                        (json/parse-string true))]
            ;(u/pres resp1)
          (-> (select-keys resp1 [:usage])
              (assoc :result (-> (get-in resp1 [:choices 0 :message :content])
                                 #_(json/parse-string true)))))))))


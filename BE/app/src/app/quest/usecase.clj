(ns app.quest.usecase
  (:require
   [app.utils :as u]
   [clojure.java.io :as io]))
;; ----- Hardcoded Quest Catalog for FE Simulation -----
(def ^:private quest-catalog
  {"clj-backend"
   {:title "Backend Developer with Clojure"
    :difficulty "Intermediate"
    :skills ["Clojure" "Ring/Reitit" "JWT" "MongoDB" "Functional Programming"]
    :questions [
                {:id 1 :q "Which Clojure function composes functions?" :choices ["compose" "->" "comp" "map"] :a 2 :exp "Use comp to compose functions in Clojure."}
                {:id 2 :q "What HTTP library is commonly used with Clojure web apps?" :choices ["monger" "ring" "okhttp" "axios"] :a 1 :exp "Ring is the de facto standard for HTTP handling in Clojure."}
                {:id 3 :q "What is the data structure for key-value in Clojure?" :choices ["vector" "list" "map" "set"] :a 2 :exp "Maps are hash maps for key-value pairs."}
                {:id 4 :q "Which type represents immutability by default?" :choices ["Java ArrayList" "Clojure collections" "Java HashMap" "All of them"] :a 1 :exp "Clojure collections are immutable by default."}
                {:id 5 :q "What macro is used to thread data forward?" :choices ["->>" "comp" "let" "doseq"] :a 0 :exp "->> threads as last argument through forms."}
                {:id 6 :q "What is a common JWT claim for expiry?" :choices ["exp" "ttl" "deadline" "stop"] :a 0 :exp "Standard JWT claim for expiration is exp (epoch seconds)."}
                {:id 7 :q "Which library helps with MongoDB in Clojure?" :choices ["monger" "datomic" "sketchy" "hikari"] :a 0 :exp "Monger is a popular MongoDB wrapper for Clojure."}
                {:id 8 :q "What is REPL good for?" :choices ["Hot reload" "Interactive dev" "Debugging" "All of the above"] :a 3 :exp "REPL helps with interactive dev, debugging, and more."}
               ]}

   "pro-math"
   {:title "Professional Mathematician"
    :difficulty "Advanced"
    :skills ["Algebra" "Calculus" "Combinatorics" "Number Theory"]
    :questions [
                {:id 1 :q "Solve: 2x + 3 = 11" :choices ["x=8" "x=4" "x=5" "x=2"] :a 2 :exp "2x=8 so x=4 is wrong; wait: 2x+3=11 -> 2x=8 -> x=4 (choice index 1)."}
                {:id 2 :q "Limit of (sin x)/x as x→0" :choices ["0" "1" "∞" "Does not exist"] :a 1 :exp "Well-known limit equals 1."}
                {:id 3 :q "Derivative of x^2" :choices ["x" "2x" "x^3" "constant"] :a 1 :exp "d/dx x^2 = 2x."}
                {:id 4 :q "Sum of first n naturals" :choices ["n(n+1)/2" "n^2" "(n+1)/2" "2n"] :a 0 :exp "Gauss formula n(n+1)/2."}
                {:id 5 :q "Prime after 7" :choices ["8" "9" "10" "11"] :a 3 :exp "11 is prime."}
                {:id 6 :q "Integral of 1/x dx" :choices ["x" "ln|x| + C" "1/x^2" "x^2/2"] :a 1 :exp "∫1/x dx = ln|x| + C."}
                {:id 7 :q "Binomial coefficient C(5,2)" :choices ["5" "10" "15" "20"] :a 1 :exp "5*4/2=10."}
                {:id 8 :q "Golden ratio approximately" :choices ["1.41" "1.62" "2.71" "3.14"] :a 1 :exp "φ ≈ 1.618."}
               ]}

   "data-science"
   {:title "Data Scientist with Python"
    :difficulty "Intermediate"
    :skills ["Python" "Pandas" "Statistics" "Visualization"]
    :questions [
                {:id 1 :q "Which library is for dataframes?" :choices ["numpy" "pandas" "matplotlib" "seaborn"] :a 1 :exp "pandas provides dataframe structures."}
                {:id 2 :q "Mean of [1,2,3,4]" :choices ["2" "2.5" "3" "3.5"] :a 1 :exp "(1+2+3+4)/4=2.5."}
                {:id 3 :q "Visualization library" :choices ["matplotlib" "flask" "pytest" "requests"] :a 0 :exp "matplotlib is for plotting."}
                {:id 4 :q "Median of [1,3,5]" :choices ["1" "3" "5" "None"] :a 1 :exp "Median is 3."}
                {:id 5 :q "CSV read function in pandas" :choices ["pd.read_csv" "pd.load_csv" "np.read_csv" "pd.csv"] :a 0 :exp "pd.read_csv(path)."}
                {:id 6 :q "Standard deviation describes" :choices ["central tendency" "spread" "skew" "kurtosis"] :a 1 :exp "Std dev measures dispersion."}
                {:id 7 :q "HTTP API framework" :choices ["django" "fastapi" "pandas" "scikit-learn"] :a 1 :exp "FastAPI is for building APIs."}
                {:id 8 :q "Probability of coin heads" :choices ["0" "0.25" "0.5" "1"] :a 2 :exp "Fair coin P=0.5."}
               ]}})

(defn- get-quest [quest-id]
  (get quest-catalog quest-id))

(defn- question->fe
  [{:keys [id q choices a]}]
  {:id id :question q :choices choices :correct-index a})

(defn list-quests
  "Return a hardcoded list of quests for the FE list page."
  [_db _openai _]
  {:status "ok"
   :quests (map (fn [[qid {:keys [title difficulty skills]}]]
                  {:id qid :title title :difficulty difficulty :skills skills})
                quest-catalog)})


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
  [_db _openai request]
  (try
    (let [learner-id (:learner-id request)
          quest-id (:quest-id request)]
      (u/info "Starting session")
      (u/info "learner-id: " learner-id)
      (u/info "quest-id: " quest-id)
      (if-let [quest (get-quest quest-id)]
        (let [qs (->> (:questions quest)
                      (take 8)
                      (map question->fe)
                      vec)]
          {:status "ok"
           :message "Session started"
           :session-id (str "sess-" (u/uuid))
           :learner-id learner-id
           :quest-id quest-id
           :skills (:skills quest)
           :question-count (count qs)
           :questions qs})
        {:status "error"
         :message "Unknown quest-id"
         :quest-id quest-id}))

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

(defn submit-answers
  "Return hardcoded explanations for each question."
  [_db _openai req]
  (let [quest-id (:quest-id req)
        answers (:answers req)
        quest (get-quest quest-id)
        bank (when quest (:questions quest))
        indexed (into {} (map (fn [{:keys [id] :as q}] [id q]) bank))
        exps (->> answers
                  (map (fn [{:keys [question-id selected-index]}]
                         (let [{:keys [q choices a exp]} (get indexed question-id)]
                           {:question-id question-id
                            :question q
                            :correct-index a
                            :correct-answer (when (and (vector? choices) (<= 0 a) (< a (count choices))) (nth choices a))
                            :selected-index selected-index
                            :is-correct (= a selected-index)
                            :explanation exp})))
                  (vec))
        score (count (filter :is-correct exps))
        total (count exps)]
    {:status "ok"
     :quest-id quest-id
     :skills (:skills quest)
     :score score
     :total total
     :explanations (vec exps)}))
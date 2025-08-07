(defproject app "0.1.0"
  :description "Backend service for ZenQuest"
  :url "https://github.com/zenius-edu/zenquest-v2"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [com.stuartsierra/component "1.1.0"]
                 [metosin/reitit "0.7.0-alpha5"]
                 [jumblerg/ring-cors "3.0.0"]
                 [ring "1.9.6" :exclusions [commons-codec]]
                 [ring/ring-core "1.10.0"]
                 [ring/ring-defaults "0.3.4" :exclusions [commons-codec]]
                 [ring/ring-jetty-adapter "1.10.0"]
                 [ring/ring-json "0.5.1"]
                 [cheshire "5.11.0"]
                 [clj-http "3.12.3"]
                 [pjstadig/humane-test-output "0.11.0"]
                 [ring/ring-mock "0.4.0"]
                 [com.novemberain/monger "3.5.0"]
                 [org.clojure/core.async "1.6.681"]
                 [buddy/buddy-core "1.11.423"]
                 [buddy/buddy-sign "3.5.351"]
                 [buddy/buddy-hashers "2.0.167"]
                 [danlentz/clj-uuid "0.1.9"]
                 [clojure.java-time "1.2.0"]
                 [environ "1.2.0"]
                 [org.immutant/web "2.1.10" :exclusions [commons-codec]]]

  :injections [(require 'pjstadig.humane-test-output)
               (pjstadig.humane-test-output/activate!)]

  :uberjar-name "uberjar-app.jar"
  :jar-name "appstore.jar"

  :min-lein-version "2.5.3"

  :source-paths ["src" "dev"]

  :resource-paths ["resources"]
  :main ^:skip-aot app.core
  :repl-options {:init-ns user}

  :plugins [[lein-environ "1.2.0"]]

  :profiles {:dev           [:project/dev :profiles/dev]
             :test          [:project/test :profiles/test]
             ;; only edit :profiles/* in profiles.clj
             :profiles/dev  {}
             :profiles/test {}
             :project/dev   {:source-paths ["src" "dev"]}
             :project/test  {:source-paths ["src" "dev"]}
             :uberjar       {:aot          :all
                             :source-paths ["src"]
                             :main         app.core}})

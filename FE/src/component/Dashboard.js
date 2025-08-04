import React, { useState } from 'react';
import { User, Flame, Play, BookOpen, Pin, Clock } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const [expandedSkills, setExpandedSkills] = useState(null);
  const [expandedReading, setExpandedReading] = useState(null);
  const [pinnedPlans, setPinnedPlans] = useState(new Set());

  const questPlans = [
    {
      id: 1,
      title: 'Backend Developer with Clojure',
      description: 'Master functional programming and build scalable backend systems',
      level: 3,
      maxLevel: 5,
      skills: ['Functional Programming', 'Clojure', 'Backend Architecture', 'Database Design', 'API Development', 'Testing', 'Performance Optimization', 'Security'],
      completedSkills: 6,
      chapters: [
        { 
          id: 1, 
          title: 'Clojure Fundamentals', 
          readingTime: '45 min',
          content: `# Clojure Fundamentals

Welcome to the world of Clojure, a dynamic programming language that combines the power of functional programming with the flexibility of Lisp. Clojure is designed for building robust, scalable applications while maintaining code simplicity and elegance.

## What is Clojure?

Clojure is a modern dialect of Lisp that runs on the Java Virtual Machine (JVM). It was created by Rich Hickey in 2007 with the goal of bringing functional programming to the JVM while maintaining practical interoperability with Java.

### Key Features

- **Immutable data structures** by default
- **Functional programming** paradigms
- **Concurrency** support built-in
- **Java interoperability** seamless integration
- **Dynamic development** with REPL-driven programming

## Basic Syntax

Clojure uses a simple, consistent syntax based on lists and symbols:

\`\`\`clojure
; This is a comment
(+ 1 2 3) ; => 6
(def name "John") ; Define a variable
(defn greet [name] (str "Hello, " name)) ; Define a function
\`\`\`

## Data Types

Clojure provides several built-in data types:

- **Numbers**: 42, 3.14, 22/7
- **Strings**: "Hello, World!"
- **Keywords**: :name, :age
- **Vectors**: [1 2 3 4]
- **Maps**: {:name "John" :age 30}
- **Sets**: #{1 2 3}

This foundation will prepare you for more advanced Clojure concepts and real-world application development.`
        },
        { 
          id: 2, 
          title: 'Functional Programming', 
          readingTime: '35 min',
          content: `# Functional Programming in Clojure

Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions. It emphasizes immutability, pure functions, and declarative code style.

## Core Principles

### Immutability

In Clojure, data structures are immutable by default. Once created, they cannot be changed. Instead, operations return new data structures.

\`\`\`clojure
(def original-vector [1 2 3])
(def new-vector (conj original-vector 4))
; original-vector is still [1 2 3]
; new-vector is [1 2 3 4]
\`\`\`

### Pure Functions

Pure functions always return the same output for the same input and have no side effects.

\`\`\`clojure
(defn add [x y]
  (+ x y)) ; Pure function

(defn impure-add [x y]
  (println "Adding numbers") ; Side effect
  (+ x y)) ; Impure function
\`\`\`

## Higher-Order Functions

Clojure provides powerful higher-order functions for data transformation:

- **map**: Transform each element
- **filter**: Select elements based on criteria
- **reduce**: Combine elements into a single value

\`\`\`clojure
(map inc [1 2 3 4]) ; => (2 3 4 5)
(filter even? [1 2 3 4]) ; => (2 4)
(reduce + [1 2 3 4]) ; => 10
\`\`\`

Mastering these concepts will make you a more effective Clojure programmer.`
        },
        { 
          id: 3, 
          title: 'Web Development with Ring', 
          readingTime: '40 min',
          content: `# Web Development with Ring

Ring is the foundational web framework for Clojure, providing a simple and flexible way to build web applications. It follows the principles of simplicity and composability.

## What is Ring?

Ring is based on the concept of handlers and middleware, similar to Rack in Ruby or WSGI in Python. It abstracts HTTP into simple Clojure data structures.

### Core Concepts

- **Handler**: A function that takes a request map and returns a response map
- **Middleware**: Functions that wrap handlers to add functionality
- **Request/Response**: Simple Clojure maps representing HTTP data

## Basic Handler

\`\`\`clojure
(defn hello-handler [request]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body "Hello, World!"})
\`\`\`

## Request and Response Maps

### Request Map Structure
\`\`\`clojure
{:uri "/hello"
 :request-method :get
 :headers {"host" "localhost:3000"}
 :params {:name "John"}}
\`\`\`

### Response Map Structure
\`\`\`clojure
{:status 200
 :headers {"Content-Type" "application/json"}
 :body "{\"message\": \"Success\"}"}
\`\`\`

## Middleware

Middleware functions wrap handlers to add cross-cutting concerns:

\`\`\`clojure
(defn wrap-logging [handler]
  (fn [request]
    (println "Request:" (:uri request))
    (handler request)))
\`\`\`

## Routing

Use libraries like Compojure for routing:

\`\`\`clojure
(defroutes app-routes
  (GET "/" [] "Welcome!")
  (GET "/users/:id" [id] (str "User " id))
  (POST "/users" [] "Create user"))
\`\`\`

Ring provides the foundation for building scalable web applications in Clojure.`
        },
        { 
          id: 4, 
          title: 'Database Integration', 
          readingTime: '30 min',
          content: `# Database Integration in Clojure

Working with databases is essential for most web applications. Clojure provides excellent libraries for database integration, making it easy to work with both SQL and NoSQL databases.

## Popular Database Libraries

### clojure.java.jdbc
The traditional choice for SQL databases:

\`\`\`clojure
(require '[clojure.java.jdbc :as jdbc])

(def db-spec {:dbtype "postgresql"
              :dbname "myapp"
              :host "localhost"
              :user "admin"
              :password "secret"})
\`\`\`

### HugSQL
SQL-focused approach with external SQL files:

\`\`\`clojure
(require '[hugsql.core :as hugsql])

; Define queries in SQL files
; -- :name get-user :? :1
; SELECT * FROM users WHERE id = :id
\`\`\`

### next.jdbc
Modern, performance-focused JDBC wrapper:

\`\`\`clojure
(require '[next.jdbc :as jdbc])

(def ds (jdbc/get-datasource db-spec))
(jdbc/execute! ds ["SELECT * FROM users WHERE active = ?" true])
\`\`\`

## Database Operations

### Creating Records
\`\`\`clojure
(jdbc/insert! ds :users {:name "John" :email "john@example.com"})
\`\`\`

### Reading Records
\`\`\`clojure
(jdbc/execute! ds ["SELECT * FROM users WHERE name = ?" "John"])
\`\`\`

### Updating Records
\`\`\`clojure
(jdbc/execute! ds ["UPDATE users SET email = ? WHERE id = ?" "new@example.com" 1])
\`\`\`

### Deleting Records
\`\`\`clojure
(jdbc/execute! ds ["DELETE FROM users WHERE id = ?" 1])
\`\`\`

## Connection Pooling

Use HikariCP for connection pooling:

\`\`\`clojure
(def pooled-ds 
  (jdbc/get-datasource 
    (assoc db-spec :maximumPoolSize 10)))
\`\`\`

## Transactions

Handle transactions properly:

\`\`\`clojure
(jdbc/with-transaction [tx ds]
  (jdbc/execute! tx ["INSERT INTO users (name) VALUES (?)" "Alice"])
  (jdbc/execute! tx ["INSERT INTO posts (user_id, title) VALUES (?, ?)" 1 "Hello"]))
\`\`\`

Database integration in Clojure is straightforward and powerful with the right tools.`
        },
        { 
          id: 5, 
          title: 'Deployment & DevOps', 
          readingTime: '25 min',
          content: `# Deployment & DevOps for Clojure

Deploying Clojure applications requires understanding the JVM ecosystem and modern deployment practices. This guide covers essential deployment strategies and DevOps practices.

## Building Applications

### Leiningen
The traditional build tool for Clojure:

\`\`\`bash
lein uberjar  # Create standalone JAR
lein ring uberjar  # For Ring applications
\`\`\`

### tools.deps
Modern dependency management:

\`\`\`clojure
; deps.edn
{:deps {org.clojure/clojure {:mvn/version "1.11.1"}}
 :aliases {:uberjar {:replace-deps {com.github.seancorfield/depstar 
                                   {:mvn/version "2.1.303"}}
                     :exec-fn hf.depstar/uberjar
                     :exec-args {:aot true :jar "myapp.jar"}}}}
\`\`\`

## Deployment Strategies

### Traditional Server Deployment
\`\`\`bash
# Copy JAR to server
scp target/myapp.jar user@server:/opt/myapp/

# Run with systemd
sudo systemctl start myapp
\`\`\`

### Docker Deployment
\`\`\`dockerfile
FROM openjdk:11-jre-slim
COPY target/myapp.jar /app/myapp.jar
EXPOSE 3000
CMD ["java", "-jar", "/app/myapp.jar"]
\`\`\`

### Cloud Deployment
Popular platforms for Clojure:
- **Heroku**: Easy deployment with buildpacks
- **AWS**: Elastic Beanstalk or ECS
- **Google Cloud**: App Engine or GKE

## Environment Configuration

Use environment variables for configuration:

\`\`\`clojure
(def config
  {:port (Integer/parseInt (or (System/getenv "PORT") "3000"))
   :database-url (or (System/getenv "DATABASE_URL") "jdbc:postgresql://localhost/myapp")})
\`\`\`

## Monitoring and Logging

### Structured Logging
\`\`\`clojure
(require '[clojure.tools.logging :as log])

(log/info "User logged in" {:user-id 123 :ip "192.168.1.1"})
\`\`\`

### Health Checks
\`\`\`clojure
(defn health-check []
  {:status 200
   :body {:status "ok" :timestamp (System/currentTimeMillis)}})
\`\`\`

## Performance Considerations

- **JVM tuning**: Set appropriate heap sizes
- **Connection pooling**: Use HikariCP
- **Caching**: Implement application-level caching
- **Profiling**: Use tools like YourKit or JProfiler

## Security

- Keep dependencies updated
- Use HTTPS in production
- Implement proper authentication/authorization
- Sanitize user inputs

Successful Clojure deployment requires attention to JVM performance, monitoring, and security best practices.`
        }
      ]
    },
    {
      id: 2,
      title: 'Professional Mathematician',
      description: 'Advanced mathematical theory and practical applications',
      level: 2,
      maxLevel: 4,
      skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Probability', 'Mathematical Modeling', 'Research Methods'],
      completedSkills: 4,
      chapters: [
        { 
          id: 1, 
          title: 'Linear Algebra Foundations', 
          readingTime: '50 min',
          content: `# Linear Algebra Foundations

Linear algebra forms the mathematical foundation for many areas of mathematics, science, and engineering. Understanding vectors, matrices, and linear transformations is essential for advanced mathematics.

## Vectors and Vector Spaces

### What is a Vector?
A vector is a mathematical object that has both magnitude and direction. Vectors can be represented in various ways:

- **Geometric**: Arrows in space
- **Algebraic**: Ordered lists of numbers
- **Abstract**: Elements of a vector space

### Vector Operations
\`\`\`
Addition: (3, 2) + (1, 4) = (4, 6)
Scalar multiplication: 3 × (2, 1) = (6, 3)
Dot product: (3, 4) · (1, 2) = 3×1 + 4×2 = 11
\`\`\`

## Matrices and Matrix Operations

### Matrix Basics
Matrices are rectangular arrays of numbers that can represent linear transformations and systems of equations.

### Matrix Operations
- **Addition**: Element-wise addition
- **Multiplication**: Row-column multiplication
- **Transpose**: Flip rows and columns
- **Determinant**: Scalar value representing matrix properties

## Applications

Linear algebra has applications in:
- Computer graphics and 3D modeling
- Machine learning and data science
- Physics and engineering
- Economics and optimization

Understanding these foundations opens doors to advanced mathematical concepts.`
        },
        { 
          id: 2, 
          title: 'Advanced Calculus', 
          readingTime: '60 min',
          content: `# Advanced Calculus

Advanced calculus extends the fundamental concepts of limits, derivatives, and integrals to more complex scenarios involving multiple variables and advanced techniques.

## Multivariable Calculus

### Partial Derivatives
When dealing with functions of multiple variables, we use partial derivatives to understand how the function changes with respect to one variable while keeping others constant.

### Gradient and Directional Derivatives
The gradient vector points in the direction of steepest increase and has applications in optimization and physics.

## Integration Techniques

### Multiple Integrals
- **Double integrals**: Integration over regions in the plane
- **Triple integrals**: Integration over regions in space
- **Applications**: Area, volume, mass, and center of mass calculations

### Line and Surface Integrals
These extend integration to curves and surfaces, with applications in physics and engineering.

## Differential Equations

### Ordinary Differential Equations (ODEs)
Equations involving derivatives of functions with respect to one variable.

### Partial Differential Equations (PDEs)
Equations involving partial derivatives, used in modeling physical phenomena.

## Vector Calculus

### Vector Fields
Functions that assign vectors to points in space, used in physics to model forces and flows.

### Fundamental Theorems
- **Green's Theorem**
- **Stokes' Theorem**  
- **Divergence Theorem**

These theorems connect different types of integrals and have profound applications in physics and engineering.`
        },
        { 
          id: 3, 
          title: 'Statistical Analysis', 
          readingTime: '45 min',
          content: `# Statistical Analysis

Statistical analysis provides tools for understanding data, making inferences, and drawing conclusions from observations. It forms the foundation for data science and research.

## Descriptive Statistics

### Measures of Central Tendency
- **Mean**: Average value
- **Median**: Middle value when data is ordered
- **Mode**: Most frequently occurring value

### Measures of Variability
- **Range**: Difference between max and min
- **Variance**: Average squared deviation from mean
- **Standard deviation**: Square root of variance

## Probability Distributions

### Common Distributions
- **Normal distribution**: Bell-shaped curve, fundamental in statistics
- **Binomial distribution**: For counting successes in trials
- **Poisson distribution**: For counting rare events

### Central Limit Theorem
One of the most important theorems in statistics, explaining why the normal distribution appears so frequently.

## Hypothesis Testing

### The Process
1. Formulate null and alternative hypotheses
2. Choose significance level (α)
3. Calculate test statistic
4. Make decision based on p-value

### Common Tests
- **t-tests**: Comparing means
- **Chi-square tests**: Testing independence
- **ANOVA**: Comparing multiple groups

## Regression Analysis

### Linear Regression
Models the relationship between variables using a straight line.

### Multiple Regression
Extends linear regression to multiple predictor variables.

## Confidence Intervals

Provide ranges of plausible values for population parameters based on sample data.

Statistical analysis enables evidence-based decision making across all fields of study.`
        },
        { 
          id: 4, 
          title: 'Probability Theory', 
          readingTime: '40 min',
          content: `# Probability Theory

Probability theory provides the mathematical framework for quantifying uncertainty and randomness. It underlies statistics, machine learning, and many areas of science.

## Basic Concepts

### Sample Space and Events
- **Sample space (Ω)**: Set of all possible outcomes
- **Event**: Subset of the sample space
- **Elementary event**: Single outcome

### Probability Axioms
1. **Non-negativity**: P(A) ≥ 0 for any event A
2. **Normalization**: P(Ω) = 1
3. **Additivity**: P(A ∪ B) = P(A) + P(B) for disjoint events

## Conditional Probability

### Definition
The probability of event A given that event B has occurred:
\`\`\`
P(A|B) = P(A ∩ B) / P(B)
\`\`\`

### Bayes' Theorem
A fundamental result for updating probabilities:
\`\`\`
P(A|B) = P(B|A) × P(A) / P(B)
\`\`\`

## Independence

### Definition
Events A and B are independent if:
\`\`\`
P(A ∩ B) = P(A) × P(B)
\`\`\`

### Applications
Independence is crucial in modeling and simplifies calculations.

## Random Variables

### Discrete Random Variables
Take on countable values with specific probabilities.

### Continuous Random Variables
Take on values in continuous ranges, described by probability density functions.

## Expectation and Variance

### Expected Value
The average value of a random variable over many trials.

### Variance
Measures the spread of a random variable around its expected value.

## Law of Large Numbers

As the number of trials increases, sample averages converge to expected values.

Probability theory provides the foundation for understanding uncertainty in mathematics and science.`
        }
      ]
    },
    {
      id: 3,
      title: 'AI/ML Engineer',
      description: 'Build intelligent systems with machine learning',
      level: 1,
      maxLevel: 3,
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Data Analysis'],
      completedSkills: 2,
      chapters: [
        { 
          id: 1, 
          title: 'Machine Learning Basics', 
          readingTime: '55 min',
          content: `# Machine Learning Basics

Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.

## What is Machine Learning?

Machine learning algorithms build mathematical models based on training data to make predictions or decisions without being explicitly programmed to perform the task.

### Types of Machine Learning

#### Supervised Learning
- **Classification**: Predicting categories (spam/not spam)
- **Regression**: Predicting continuous values (house prices)

#### Unsupervised Learning
- **Clustering**: Grouping similar data points
- **Dimensionality reduction**: Simplifying data while preserving important features

#### Reinforcement Learning
Learning through interaction with an environment to maximize rewards.

## Key Concepts

### Training and Testing Data
- **Training set**: Data used to train the model
- **Test set**: Data used to evaluate model performance
- **Validation set**: Data used for model selection

### Overfitting and Underfitting
- **Overfitting**: Model memorizes training data but fails on new data
- **Underfitting**: Model is too simple to capture underlying patterns

## Common Algorithms

### Linear Regression
Simple algorithm for predicting continuous values using a linear relationship.

### Decision Trees
Tree-like models that make decisions based on feature values.

### Support Vector Machines (SVM)
Finds optimal boundaries between different classes.

### k-Nearest Neighbors (k-NN)
Classifies based on the majority class of nearest neighbors.

## Evaluation Metrics

### For Classification
- **Accuracy**: Percentage of correct predictions
- **Precision**: True positives / (True positives + False positives)
- **Recall**: True positives / (True positives + False negatives)

### For Regression
- **Mean Squared Error (MSE)**: Average squared differences
- **R-squared**: Proportion of variance explained

Machine learning provides powerful tools for extracting insights from data and making intelligent predictions.`
        },
        { 
          id: 2, 
          title: 'Deep Learning Introduction', 
          readingTime: '65 min',
          content: `# Deep Learning Introduction

Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers to model and understand complex patterns in data.

## Neural Networks Fundamentals

### Artificial Neurons
Inspired by biological neurons, artificial neurons:
- Receive inputs
- Apply weights and bias
- Use activation functions
- Produce outputs

### Network Architecture
- **Input layer**: Receives data
- **Hidden layers**: Process information
- **Output layer**: Produces final results

## Deep Learning vs Traditional ML

### Advantages of Deep Learning
- **Automatic feature extraction**: No manual feature engineering
- **Scalability**: Performance improves with more data
- **Versatility**: Works well with images, text, audio

### When to Use Deep Learning
- Large datasets available
- Complex patterns in data
- Sufficient computational resources

## Common Architectures

### Feedforward Networks
Basic networks where information flows in one direction.

### Convolutional Neural Networks (CNNs)
Specialized for image processing:
- **Convolutional layers**: Extract features
- **Pooling layers**: Reduce spatial dimensions
- **Fully connected layers**: Final classification

### Recurrent Neural Networks (RNNs)
Designed for sequential data:
- **LSTM**: Long Short-Term Memory networks
- **GRU**: Gated Recurrent Units

## Training Deep Networks

### Backpropagation
Algorithm for updating network weights based on errors.

### Optimization Algorithms
- **Gradient Descent**: Basic optimization
- **Adam**: Adaptive learning rates
- **RMSprop**: Root Mean Square propagation

### Regularization Techniques
- **Dropout**: Randomly disable neurons during training
- **Batch normalization**: Normalize inputs to layers
- **Early stopping**: Stop training when validation performance plateaus

## Applications

### Computer Vision
- Image classification
- Object detection
- Facial recognition

### Natural Language Processing
- Language translation
- Sentiment analysis
- Text generation

### Other Domains
- Game playing (AlphaGo)
- Drug discovery
- Autonomous vehicles

Deep learning has revolutionized AI by enabling machines to achieve human-level performance in many tasks.`
        },
        { 
          id: 3, 
          title: 'Python for ML', 
          readingTime: '40 min',
          content: `# Python for Machine Learning

Python has become the dominant language for machine learning due to its simplicity, extensive libraries, and strong community support.

## Why Python for ML?

### Advantages
- **Readable syntax**: Easy to learn and understand
- **Rich ecosystem**: Extensive libraries and frameworks
- **Community support**: Large community and resources
- **Versatility**: Works for web development, data analysis, and ML

## Essential Libraries

### NumPy
Foundation for numerical computing:
\`\`\`python
import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Mathematical operations
result = np.dot(matrix, arr[:2])
\`\`\`

### Pandas
Data manipulation and analysis:
\`\`\`python
import pandas as pd

# Create DataFrame
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})

# Data operations
filtered = df[df['A'] > 1]
grouped = df.groupby('A').sum()
\`\`\`

### Matplotlib and Seaborn
Data visualization:
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Basic plotting
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()

# Statistical plots
sns.scatterplot(data=df, x='A', y='B')
\`\`\`

### Scikit-learn
Machine learning algorithms:
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
\`\`\`

## Data Processing Workflow

### 1. Data Collection
- Reading from files (CSV, JSON, databases)
- Web scraping
- APIs

### 2. Data Cleaning
- Handling missing values
- Removing outliers
- Data type conversions

### 3. Exploratory Data Analysis
- Statistical summaries
- Visualizations
- Correlation analysis

### 4. Feature Engineering
- Creating new features
- Scaling and normalization
- Encoding categorical variables

### 5. Model Training and Evaluation
- Splitting data
- Training models
- Evaluating performance

## Best Practices

### Code Organization
- Use functions and classes
- Modular design
- Documentation

### Version Control
- Use Git for tracking changes
- Collaborative development

### Environment Management
- Virtual environments
- Dependency management with pip/conda

Python's ecosystem makes it an ideal choice for machine learning projects from prototyping to production.`
        }
      ]
    }
  ];

  const togglePin = (planId) => {
    const newPinnedPlans = new Set(pinnedPlans);
    if (newPinnedPlans.has(planId)) {
      newPinnedPlans.delete(planId);
    } else {
      newPinnedPlans.add(planId);
    }
    setPinnedPlans(newPinnedPlans);
  };

  // Sort plans to show pinned ones first
  const sortedPlans = [...questPlans].sort((a, b) => {
    const aIsPinned = pinnedPlans.has(a.id);
    const bIsPinned = pinnedPlans.has(b.id);
    
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  const handleStartQuiz = (plan) => {
    window.zenverseSelectedPlan = plan;
    onNavigate && onNavigate('quiz');
  };

  const handleReadingMaterial = (plan) => {
    setExpandedReading(expandedReading === plan.id ? null : plan.id);
  };

  const handleReadChapter = (plan, chapter) => {
    window.zenverseSelectedPlan = plan;
    window.zenverseSelectedChapter = chapter;
    onNavigate && onNavigate('reading-page');
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Beautiful ZenQuest Header */}
      <div className="relative py-2" style={{background: '#372974'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 px-6">
            <div className="flex items-center">
              <img 
                src="/images/zenquest 2.png" 
                alt="ZenQuest Logo" 
                className="w-auto object-contain"
                style={{height: '88px'}}
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-20 w-32 h-32 bg-orange-400 bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-40 w-20 h-20 bg-purple-400 bg-opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Paper-like Content Area */}
      <div className="bg-white mx-4 -mt-4 rounded-3xl shadow-lg relative z-10 min-h-screen">
        <div className="p-6 pb-32">      
          <div className="max-w-sm mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Hello!</p>
                        <div className="flex items-center space-x-3">
                          <h2 className="text-xl font-bold text-gray-900">Fellycia Alvira</h2>
                          <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                            PRO
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Streak Counter */}
                <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-600 font-bold text-sm">7</span>
                </div>
              </div>
            </div>

            {/* Create New Quest Button */}
            <div className="mb-8">
              <button 
                onClick={() => onNavigate && onNavigate('learning-journey')}
                className="w-full rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 text-left group"
                style={{background: 'linear-gradient(135deg, #e76366 0%, #372974 100%)'}}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">Create New Quest</h3>
                    <p className="text-white text-opacity-80 text-xs">Start a personalized learning journey</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Quest Cards - Exact Copy from CourseResult */}
            <div className="space-y-4">
              {sortedPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`bg-white rounded-2xl shadow-md overflow-hidden border-2 transition-all duration-200 ${
                    pinnedPlans.has(plan.id) 
                      ? 'border-orange-200 ring-2 ring-orange-100 shadow-lg' 
                      : 'border-gray-100 hover:shadow-lg'
                  }`}
                >
                  {/* Plan Header */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Drag Handle */}
                        <div className="flex flex-col space-y-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                        
                        {/* Circular Level Progress */}
                        <div className="w-16 h-16 relative flex items-center justify-center flex-shrink-0">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="#e5e7eb"
                              strokeWidth="4"
                              fill="none"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="#372974"
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${(plan.level / plan.maxLevel) * 175.9} 175.9`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold" style={{color: '#372974'}}>L{plan.level}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{plan.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                        </div>
                      </div>
                      
                      {/* Pin Button */}
                      <button
                        onClick={() => togglePin(plan.id)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          pinnedPlans.has(plan.id)
                            ? 'bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-sm'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                        }`}
                        title={pinnedPlans.has(plan.id) ? 'Unpin quest' : 'Pin quest'}
                      >
                        <Pin className={`w-4 h-4 transition-transform duration-200 ${
                          pinnedPlans.has(plan.id) ? 'fill-current rotate-12' : ''
                        }`} />
                      </button>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3 mb-4">
                      <button
                        onClick={() => handleStartQuiz(plan)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Practice</span>
                      </button>
                      <button
                        onClick={() => handleReadingMaterial(plan)}
                        className="flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2 border hover:bg-gray-50"
                        style={{
                          borderColor: '#372974',
                          color: '#372974'
                        }}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Study</span>
                      </button>
                    </div>

                    {/* Skills Information Button */}
                    <div className="mb-4">
                      <button
                        onClick={() => setExpandedSkills(expandedSkills === plan.id ? null : plan.id)}
                        className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span className="font-medium text-gray-900 text-sm">Skills in this Quest</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {expandedSkills === plan.id ? 'Hide' : 'Show'} {plan.skills.length} skills
                        </div>
                      </button>
                    </div>

                    {/* Skills Information - Only show when expanded */}
                    {expandedSkills === plan.id && (
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="grid grid-cols-1 gap-2">
                          {plan.skills.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full" style={{backgroundColor: index < plan.completedSkills ? '#f97316' : '#d1d5db'}}></div>
                              <span className={`text-xs ${index < plan.completedSkills ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reading Materials Section */}
                  {expandedReading === plan.id && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      <div className="p-5">
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Reading Materials</h4>
                        
                        <div className="space-y-3">
                          {plan.chapters && plan.chapters.length > 0 ? (
                            plan.chapters.map((chapter, index) => (
                              <div
                                key={chapter.id}
                                className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 text-white rounded-xl flex items-center justify-center text-sm font-bold" style={{backgroundColor: '#372974'}}>
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 text-sm">{chapter.title}</h5>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Clock className="w-3 h-3 text-gray-400" />
                                      <span className="text-xs text-gray-500">{chapter.readingTime}</span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleReadChapter(plan, chapter)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                                >
                                  Read
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-500 text-sm">No reading materials available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
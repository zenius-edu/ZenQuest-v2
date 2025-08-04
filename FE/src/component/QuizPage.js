import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Trophy, RefreshCw, ArrowLeft, Play } from 'lucide-react';

const QuizPage = ({ onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var myVariable = 5;",
        "variable myVariable = 5;",
        "declare myVariable = 5;",
        "int myVariable = 5;"
      ],
      correct: 0,
      explanation: "In JavaScript, 'var' is one of the keywords used to declare variables. Other valid keywords include 'let' and 'const'. The syntax 'var myVariable = 5;' correctly declares a variable named 'myVariable' and assigns it the value 5."
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: [
        "array.add()",
        "array.push()",
        "array.append()",
        "array.insert()"
      ],
      correct: 1,
      explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array. For example: arr.push(element) will add 'element' to the end of the 'arr' array."
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correct: 2,
      explanation: "CSS stands for Cascading Style Sheets. It's a stylesheet language used to describe the presentation of a document written in HTML or XML. The 'cascading' refers to the way styles can be inherited and overridden."
    },
    {
      id: 4,
      question: "Which HTML tag is used to create a hyperlink?",
      options: [
        "<link>",
        "<a>",
        "<href>",
        "<url>"
      ],
      correct: 1,
      explanation: "The <a> (anchor) tag is used to create hyperlinks in HTML. The 'href' attribute specifies the URL of the page the link goes to. Example: <a href='https://example.com'>Link text</a>"
    },
    {
      id: 5,
      question: "What is the purpose of the 'useState' hook in React?",
      options: [
        "To manage component state",
        "To handle side effects",
        "To create components",
        "To import modules"
      ],
      correct: 0,
      explanation: "useState is a React Hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it. Example: const [count, setCount] = useState(0);"
    },
    {
      id: 6,
      question: "Which operator is used for strict equality in JavaScript?",
      options: [
        "==",
        "===",
        "=",
        "!="
      ],
      correct: 1,
      explanation: "The === operator checks for strict equality, meaning both value and type must be the same. Unlike ==, it doesn't perform type coercion. For example: 5 === '5' returns false, while 5 == '5' returns true."
    },
    {
      id: 7,
      question: "What is the default port for HTTP?",
      options: [
        "443",
        "8080",
        "80",
        "3000"
      ],
      correct: 2,
      explanation: "Port 80 is the default port for HTTP (Hypertext Transfer Protocol). Port 443 is for HTTPS, 8080 is commonly used for development servers, and 3000 is often used by development frameworks like React."
    }
  ];

  // Timer countdown
  useEffect(() => {
    if (!quizFinished && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizFinished) {
      finishQuiz();
    }
  }, [timeLeft, quizFinished]);

  const selectAnswer = (answerIndex) => {
    if (showAnswer) return; // Prevent selecting after already answered
    
    setSelectedAnswer(answerIndex);
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
    setShowAnswer(true);

    // Auto move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    calculateScore();
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(120);
    setQuizFinished(false);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressBarColor = () => {
    const percentage = (timeLeft / 120) * 100;
    if (percentage > 50) return 'from-green-400 to-green-500';
    if (percentage > 25) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-red-500';
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent! 🎉';
    if (percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };

  const getOptionStyle = (optionIndex) => {
    if (!showAnswer) {
      return 'border-gray-200 bg-white hover:border-gray-300';
    }
    
    const isCorrect = optionIndex === questions[currentQuestion].correct;
    const isSelected = optionIndex === selectedAnswer;
    
    if (isCorrect) {
      return 'border-green-500 bg-green-50 text-green-900';
    } else if (isSelected && !isCorrect) {
      return 'border-red-500 bg-red-50 text-red-900';
    } else {
      return 'border-gray-200 bg-gray-50 text-gray-500';
    }
  };

  const getOptionIcon = (optionIndex) => {
    if (!showAnswer) {
      return <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>;
    }
    
    const isCorrect = optionIndex === questions[currentQuestion].correct;
    const isSelected = optionIndex === selectedAnswer;
    
    if (isCorrect) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (isSelected && !isCorrect) {
      return <XCircle className="w-6 h-6 text-red-500" />;
    } else {
      return <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100"></div>;
    }
  };

  // Quiz Result Screen
  if (quizFinished) {
    if (showExplanation) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="pb-24">
            {/* Simple Header */}
            <div className="px-6 py-4" style={{background: '#372974'}}>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowExplanation(false)}
                  className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h1 className="text-lg font-medium text-white">Quiz Explanations</h1>
                <div className="w-8"></div>
              </div>
            </div>

            {/* Questions with Explanations */}
            <div className="px-6 py-6">
              <div className="space-y-6">
                {questions.map((question, questionIndex) => (
                  <div key={question.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{backgroundColor: '#372974'}}>
                        {questionIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                        {selectedAnswers[questionIndex] === question.correct ? (
                          <div className="inline-flex items-center space-x-1 bg-green-100 text-green-600 px-2 py-1 rounded-lg text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            <span>Correct</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-medium">
                            <XCircle className="w-3 h-3" />
                            <span>Incorrect</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border text-sm ${
                            optionIndex === question.correct
                              ? 'border-green-200 bg-green-50 text-green-900'
                              : optionIndex === selectedAnswers[questionIndex]
                              ? 'border-red-200 bg-red-50 text-red-900'
                              : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {optionIndex === question.correct ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : optionIndex === selectedAnswers[questionIndex] ? (
                              <XCircle className="w-4 h-4 text-red-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                            )}
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                      <p className="text-blue-800 text-sm leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Quiz Complete!</h1>
            <p className="text-gray-600 mb-6">{getScoreMessage()}</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className="text-gray-600 text-sm">
                {Math.round((score / questions.length) * 100)}% correct
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate && onNavigate('dashboard')}
                className="w-full text-white py-3 rounded-xl font-medium transition-all duration-200 active:scale-95"
                style={{background: '#372974'}}
              >
                Continue Learning
              </button>
              <button
                onClick={() => setShowExplanation(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95"
              >
                View Explanations
              </button>
              <button
                onClick={restartQuiz}
                className="w-full border-2 hover:bg-gray-50 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95"
                style={{borderColor: '#372974', color: '#372974'}}
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Question Screen
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-32">
        {/* Simple Quiz Header */}
        <div className="px-6 py-6" style={{background: '#372974'}}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div className="text-center">
              <div className="text-white text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            
            {/* Simple Timer */}
            <div className="flex items-center space-x-2 text-white text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {/* Simple Progress Bar */}
          <div className="mt-4 w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="h-2 bg-white bg-opacity-60 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 120) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="px-6 py-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={showAnswer}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${getOptionStyle(index)} ${showAnswer ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}`}
                >
                  <div className="flex items-center space-x-3">
                    {getOptionIcon(index)}
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 
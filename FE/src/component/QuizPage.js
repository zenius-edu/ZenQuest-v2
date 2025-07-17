import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';

const QuizPage = ({ onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
      correct: 0
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
      correct: 1
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
      correct: 2
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
      correct: 1
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
      correct: 0
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
      correct: 1
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
      correct: 2
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="bg-white rounded-[24px] shadow-xl p-8 w-full max-w-md text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-gray-600 mb-6">{getScoreMessage()}</p>
            
            <div className="bg-gray-50 rounded-[20px] p-6 mb-6">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className="text-gray-600 text-sm">
                {Math.round((score / questions.length) * 100)}% correct
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={restartQuiz}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-full font-semibold transition-all duration-200 active:scale-95"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Try Again
              </button>
              <button
                onClick={() => onNavigate && onNavigate('course-result')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95"
              >
                Back to Courses
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="pb-24">
        <div className="bg-white shadow-2xl overflow-hidden">
          
          {/* Quiz Header */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <span className="text-sm opacity-90">Question</span>
                <div className="text-xl font-bold">{currentQuestion + 1}/{questions.length}</div>
              </div>
              <div className="text-white text-center">
                <Clock className="w-6 h-6 mx-auto mb-1" />
                <div className="text-lg font-bold">{formatTime(timeLeft)}</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 h-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 opacity-50"></div>
            <div 
              className={`bg-gradient-to-r ${getProgressBarColor()} h-full transition-all duration-1000 ease-out relative z-10 shadow-sm`}
              style={{ width: `${(timeLeft / 120) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
            </div>
            {timeLeft <= 30 && (
              <div className="absolute inset-0 bg-red-500 opacity-10 animate-ping"></div>
            )}
          </div>

          {/* Question Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 leading-tight">
              {currentQ.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={showAnswer}
                  className={`w-full text-left p-4 rounded-[16px] border-2 transition-all duration-200 ${getOptionStyle(index)} ${showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
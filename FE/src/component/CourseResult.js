import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Target, Plus, ChevronRight, ChevronDown, Play, CheckCircle } from 'lucide-react';

const CourseResult = ({ onNavigate }) => {
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [developmentPlans, setDevelopmentPlans] = useState([]);

  // Default plans data
  const defaultPlans = [
    {
      id: 1,
      title: "Felly's Frontend Development Plan",
      description: "Complete frontend development journey",
      totalSkills: 8,
      completedSkills: 5,
      progress: 62,
      bgColor: "from-blue-400 to-blue-500",
      icon: "💻",
      chapters: [
        { id: 1, title: "HTML Fundamentals", readingTime: "15 min", content: "# HTML Fundamentals\n\nHTML (HyperText Markup Language) is the standard markup language for creating web pages..." },
        { id: 2, title: "CSS Styling", readingTime: "20 min", content: "# CSS Styling\n\nCSS (Cascading Style Sheets) is used to style and layout web pages..." },
        { id: 3, title: "JavaScript Basics", readingTime: "25 min", content: "# JavaScript Basics\n\nJavaScript is a programming language that enables interactive web pages..." },
        { id: 4, title: "DOM Manipulation", readingTime: "18 min", content: "# DOM Manipulation\n\nThe Document Object Model (DOM) is a programming interface for HTML documents..." },
        { id: 5, title: "React Components", readingTime: "30 min", content: "# React Components\n\nReact components are the building blocks of React applications..." }
      ],
      skills: [
        { name: "HTML Fundamentals", completed: true, readingTime: "15 min" },
        { name: "CSS Styling", completed: true, readingTime: "20 min" },
        { name: "JavaScript Basics", completed: true, readingTime: "25 min" },
        { name: "DOM Manipulation", completed: true, readingTime: "18 min" },
        { name: "React Components", completed: true, readingTime: "30 min" },
        { name: "State Management", completed: false, readingTime: "22 min" },
        { name: "API Integration", completed: false, readingTime: "28 min" },
        { name: "Testing & Debugging", completed: false, readingTime: "35 min" }
      ]
    },
    {
      id: 2,
      title: "Backend Development Plan",
      description: "Server-side development mastery",
      totalSkills: 6,
      completedSkills: 2,
      progress: 33,
      bgColor: "from-green-400 to-green-500",
      icon: "🚀",
      chapters: [
        { id: 1, title: "Node.js Basics", readingTime: "20 min", content: "# Node.js Basics\n\nNode.js is a JavaScript runtime built on Chrome's V8 JavaScript engine..." },
        { id: 2, title: "Express Framework", readingTime: "25 min", content: "# Express Framework\n\nExpress is a minimal and flexible Node.js web application framework..." },
        { id: 3, title: "Database Design", readingTime: "30 min", content: "# Database Design\n\nDatabase design is the process of producing a detailed data model of a database..." },
        { id: 4, title: "API Development", readingTime: "35 min", content: "# API Development\n\nAPI (Application Programming Interface) development involves creating endpoints..." },
        { id: 5, title: "Authentication", readingTime: "28 min", content: "# Authentication\n\nAuthentication is the process of verifying the identity of a user..." }
      ],
      skills: [
        { name: "Node.js Basics", completed: true, readingTime: "20 min" },
        { name: "Express Framework", completed: true, readingTime: "25 min" },
        { name: "Database Design", completed: false, readingTime: "30 min" },
        { name: "API Development", completed: false, readingTime: "35 min" },
        { name: "Authentication", completed: false, readingTime: "28 min" },
        { name: "Deployment", completed: false, readingTime: "40 min" }
      ]
    },
    {
      id: 3,
      title: "Mobile Development Plan",
      description: "Cross-platform mobile applications",
      totalSkills: 7,
      completedSkills: 1,
      progress: 14,
      bgColor: "from-purple-400 to-purple-500",
      icon: "📱",
      chapters: [
        { id: 1, title: "React Native Setup", readingTime: "25 min", content: "# React Native Setup\n\nReact Native is a framework for building mobile applications using React..." },
        { id: 2, title: "Navigation", readingTime: "20 min", content: "# Navigation\n\nNavigation in React Native helps users move between different screens..." },
        { id: 3, title: "UI Components", readingTime: "30 min", content: "# UI Components\n\nReact Native provides a variety of built-in components for building user interfaces..." },
        { id: 4, title: "Device APIs", readingTime: "25 min", content: "# Device APIs\n\nReact Native provides access to various device APIs and native modules..." }
      ],
      skills: [
        { name: "React Native Setup", completed: true, readingTime: "25 min" },
        { name: "Navigation", completed: false, readingTime: "20 min" },
        { name: "UI Components", completed: false, readingTime: "30 min" },
        { name: "Device APIs", completed: false, readingTime: "25 min" },
        { name: "Performance", completed: false, readingTime: "35 min" },
        { name: "App Store", completed: false, readingTime: "45 min" },
        { name: "Testing", completed: false, readingTime: "30 min" }
      ]
    },
    {
      id: 4,
      title: "DevOps & Cloud Plan",
      description: "Infrastructure and deployment",
      totalSkills: 5,
      completedSkills: 0,
      progress: 0,
      bgColor: "from-orange-400 to-orange-500",
      icon: "☁️",
      chapters: [
        { id: 1, title: "Git & Version Control", readingTime: "20 min", content: "# Git & Version Control\n\nGit is a distributed version control system for tracking changes..." },
        { id: 2, title: "Docker Containers", readingTime: "40 min", content: "# Docker Containers\n\nDocker is a platform for developing, shipping, and running applications..." },
        { id: 3, title: "AWS Basics", readingTime: "35 min", content: "# AWS Basics\n\nAmazon Web Services (AWS) is a comprehensive cloud computing platform..." },
        { id: 4, title: "CI/CD Pipeline", readingTime: "45 min", content: "# CI/CD Pipeline\n\nContinuous Integration and Continuous Deployment automate the software delivery process..." }
      ],
      skills: [
        { name: "Git & Version Control", completed: false, readingTime: "20 min" },
        { name: "Docker Containers", completed: false, readingTime: "40 min" },
        { name: "AWS Basics", completed: false, readingTime: "35 min" },
        { name: "CI/CD Pipeline", completed: false, readingTime: "45 min" },
        { name: "Monitoring", completed: false, readingTime: "30 min" }
      ]
    }
  ];

  // Load plans from localStorage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('zenverse_development_plans');
    if (savedPlans) {
      try {
        const parsedPlans = JSON.parse(savedPlans);
        // Merge with default plans to ensure chapters exist
        const mergedPlans = parsedPlans.map(savedPlan => {
          const defaultPlan = defaultPlans.find(dp => dp.id === savedPlan.id);
          return {
            ...savedPlan,
            chapters: savedPlan.chapters || (defaultPlan ? defaultPlan.chapters : [])
          };
        });
        setDevelopmentPlans(mergedPlans);
      } catch (error) {
        console.error('Error loading plans from localStorage:', error);
        setDevelopmentPlans(defaultPlans);
        saveToLocalStorage(defaultPlans);
      }
    } else {
      setDevelopmentPlans(defaultPlans);
      saveToLocalStorage(defaultPlans);
    }
  }, []);

  // Save plans to localStorage
  const saveToLocalStorage = (plans) => {
    try {
      localStorage.setItem('zenverse_development_plans', JSON.stringify(plans));
    } catch (error) {
      console.error('Error saving plans to localStorage:', error);
    }
  };

  // Update plans and save to localStorage
  const updatePlans = (newPlans) => {
    setDevelopmentPlans(newPlans);
    saveToLocalStorage(newPlans);
  };

  // Handle skill completion toggle
  const toggleSkillCompletion = (planId, skillIndex) => {
    const updatedPlans = developmentPlans.map(plan => {
      if (plan.id === planId) {
        const updatedSkills = [...plan.skills];
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          completed: !updatedSkills[skillIndex].completed
        };
        
        const completedCount = updatedSkills.filter(skill => skill.completed).length;
        const progress = Math.round((completedCount / updatedSkills.length) * 100);
        
        return {
          ...plan,
          skills: updatedSkills,
          completedSkills: completedCount,
          progress: progress
        };
      }
      return plan;
    });
    
    updatePlans(updatedPlans);
  };

  // Add new quest to the plans
  const addNewQuest = (questData) => {
    const newId = Math.max(...developmentPlans.map(p => p.id), 0) + 1;
    const colors = [
      "from-rose-400 to-rose-500",
      "from-indigo-400 to-indigo-500",
      "from-teal-400 to-teal-500",
      "from-amber-400 to-amber-500",
      "from-pink-400 to-pink-500",
      "from-cyan-400 to-cyan-500"
    ];
    const icons = ["🎯", "🚀", "💡", "⭐", "🔥", "💎"];
    
    const newPlan = {
      id: newId,
      title: `${questData.topic} Development Plan`,
      description: `Custom learning path for ${questData.topic}`,
      totalSkills: 6,
      completedSkills: 0,
      progress: 0,
      bgColor: colors[newId % colors.length],
      icon: icons[newId % icons.length],
      chapters: [
        { id: 1, title: `${questData.topic} Introduction`, readingTime: "15 min", content: `# ${questData.topic} Introduction\n\nWelcome to your ${questData.topic} learning journey...` },
        { id: 2, title: `${questData.topic} Fundamentals`, readingTime: "20 min", content: `# ${questData.topic} Fundamentals\n\nCore concepts and principles...` },
        { id: 3, title: `${questData.topic} Advanced Topics`, readingTime: "25 min", content: `# ${questData.topic} Advanced Topics\n\nAdvanced techniques and best practices...` },
        { id: 4, title: `${questData.topic} Real-world Applications`, readingTime: "30 min", content: `# ${questData.topic} Real-world Applications\n\nPractical examples and use cases...` }
      ],
      skills: [
        { name: `${questData.topic} Basics`, completed: false, readingTime: "20 min" },
        { name: `${questData.topic} Fundamentals`, completed: false, readingTime: "25 min" },
        { name: `${questData.topic} Advanced Concepts`, completed: false, readingTime: "30 min" },
        { name: `${questData.topic} Best Practices`, completed: false, readingTime: "28 min" },
        { name: `${questData.topic} Real Projects`, completed: false, readingTime: "40 min" },
        { name: `${questData.topic} Mastery`, completed: false, readingTime: "45 min" }
      ]
    };
    
    const updatedPlans = [...developmentPlans, newPlan];
    updatePlans(updatedPlans);
  };

  // Store the addNewQuest function globally so other components can access it
  useEffect(() => {
    window.zenverseAddQuest = addNewQuest;
    return () => {
      delete window.zenverseAddQuest;
    };
  }, [developmentPlans]);

  const handleRecreateQuest = () => {
    if (onNavigate) {
      onNavigate('learning-journey');
    }
  };

  const togglePlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const handleStartQuiz = (plan) => {
    if (onNavigate) {
      onNavigate('quiz');
    }
  };

  const handleReadingMaterial = (plan) => {
    // Toggle expand to show chapters instead of navigating
    togglePlan(plan.id);
  };

  const handleReadChapter = (plan, chapter) => {
    // Store selected plan and chapter globally for ReadingPage component
    window.zenverseSelectedPlan = plan;
    window.zenverseSelectedChapter = chapter;
    if (onNavigate) {
      onNavigate('reading-page');
    }
  };

  const handleReadSkill = (plan, skill) => {
    alert(`Opening reading material for "${skill.name}" from ${plan.title}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-24">
        <div className="bg-white overflow-hidden">
          
          {/* Simple Header */}
          <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-8 pb-12">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-lg font-bold text-white">Your Learning Quest</h1>
                <p className="text-orange-100 text-sm mt-1">Personalized development plans</p>
              </div>
            </div>
            
            {/* Curved Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-white" style={{
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
            }}></div>
          </div>

          {/* Create New Quest Section */}
          <div className="px-6 py-4 border-b border-gray-100">
            <button 
              onClick={handleRecreateQuest}
              className="w-full bg-gray-50 hover:bg-gray-100 rounded-[16px] px-4 py-3 transition-all duration-200 active:scale-95 border border-gray-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 text-sm font-medium">Create New Quest</span>
              </div>
            </button>
          </div>

          {/* Development Plans */}
          <div className="px-6 py-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Development Plans</h2>
              <p className="text-gray-600 text-sm">Structured learning paths ({developmentPlans.length} plans)</p>
            </div>
            
            <div className="space-y-4">
              {developmentPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-[20px] shadow-sm overflow-hidden"
                >
                  {/* Plan Header - Clickable */}
                  <button
                    onClick={() => togglePlan(plan.id)}
                    className="w-full p-5 text-left hover:bg-orange-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${plan.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xl">{plan.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg">{plan.title}</h3>
                        <p className="text-gray-600 text-sm">{plan.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {expandedPlan === plan.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </button>

                  {/* Action Buttons - Always Visible */}
                  <div className="px-5 pb-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleStartQuiz(plan)}
                        className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 px-4 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Quiz</span>
                      </button>
                      <button
                        onClick={() => handleReadingMaterial(plan)}
                        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 border border-gray-200"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Reading Material</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Chapters List */}
                  {expandedPlan === plan.id && (
                    <div className="border-t border-orange-200 bg-orange-50">
                      <div className="p-4">
                        <div className="space-y-2">
                          {plan.chapters && plan.chapters.length > 0 ? (
                            plan.chapters.map((chapter, index) => (
                              <div
                                key={chapter.id}
                                className="bg-white rounded-lg p-3 border border-orange-200 flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {chapter.title}
                                    </span>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Clock className="w-3 h-3 text-gray-400" />
                                      <span className="text-xs text-gray-500">{chapter.readingTime}</span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleReadChapter(plan, chapter)}
                                  className="bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-3 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 flex items-center space-x-1"
                                >
                                  <BookOpen className="w-3 h-3" />
                                  <span>Read</span>
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4">
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

export default CourseResult; 
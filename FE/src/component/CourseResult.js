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
        { id: 1, title: "HTML Fundamentals", readingTime: "45 min", content: `
# HTML Fundamentals: Building the Foundation of the Web

HTML (HyperText Markup Language) stands as the cornerstone of web development, serving as the fundamental building block that powers every website you encounter in your daily digital journey. Created by Tim Berners-Lee in 1990 while working at CERN, HTML has evolved from a simple document markup language into a sophisticated platform for creating rich, interactive web experiences that billions of people rely on every single day.

## The Revolutionary Vision of Tim Berners-Lee

In the late 1980s, the world of computing was fragmented and isolated. Different computer systems spoke different languages, used different protocols, and stored information in incompatible formats. Scientists at CERN, the European research organization, were struggling with a problem that seemed insurmountable: how to share research findings and collaborate effectively across different computer networks and systems spread around the globe.

Tim Berners-Lee, a British computer scientist working at CERN, had a revolutionary vision. He imagined a universal information space where documents could be linked together seamlessly, regardless of the computer system they resided on. This wasn't just about creating another file format or communication protocol—it was about fundamentally changing how human knowledge could be shared and accessed.

His vision led to the creation of three interconnected technologies that would change the world forever. The HyperText Markup Language (HTML) would provide a way to structure and format documents. The HyperText Transfer Protocol (HTTP) would enable these documents to be transmitted across networks. And the Uniform Resource Locator (URL) would provide a universal addressing system to locate any document anywhere in the world.

The first web page went live on August 6, 1991, and it was remarkably simple by today's standards. It contained just text, basic formatting, and a few links. Yet this humble beginning would spark a revolution that would transform commerce, education, entertainment, and virtually every aspect of human society.

## Understanding HTML's Core Philosophy

HTML is fundamentally different from programming languages like JavaScript, Python, or Java. While programming languages give computers step-by-step instructions to perform calculations and manipulate data, HTML is a markup language that describes the structure and meaning of content. When you write HTML, you're not programming in the traditional sense—you're annotating text with semantic information that both humans and machines can understand.

Think of HTML as a way to have a conversation with both browsers and users about what your content means. Every element you choose tells a story about the importance, relationships, and purpose of different pieces of information on your page. This semantic approach is what makes HTML so powerful and enduring.

The beauty of HTML lies in its simplicity and universality. A properly written HTML document can be rendered by any web browser, read by screen readers for accessibility, indexed by search engines, and processed by countless other tools and services. This universality was by design—Berners-Lee wanted to create a system that would work for everyone, regardless of their technology, location, or abilities.

## The Evolution Through Decades

### HTML 1.0: The Humble Beginning (1991)

The original HTML specification was remarkably simple, containing just 18 elements. These included basic structural elements like headings (\`<h1>\` through \`<h6>\`), paragraphs (\`<p>\`), and the revolutionary anchor element (\`<a>\`) that made hyperlinks possible. There were also elements for lists, basic text formatting, and a few other essential features.

Despite its simplicity, this first version established principles that remain important today. Elements had semantic meaning—a heading was marked as a heading, not just text that looked bigger. Links could connect to any document anywhere on the emerging World Wide Web. The foundation was laid for a truly universal information sharing system.

### HTML 2.0: Standardization and Forms (1995)

As the web began to grow rapidly in the early 1990s, it became clear that HTML needed to be standardized and expanded. HTML 2.0 was the first version to be published as an official standard by the Internet Engineering Task Force (IETF). This version introduced several crucial features that transformed the web from a read-only medium into an interactive platform.

Forms were perhaps the most significant addition, enabling websites to collect user input for the first time. Suddenly, the web could support everything from simple feedback forms to complex applications. Image embedding was also formalized, allowing websites to include graphics alongside text. These additions marked the beginning of the web's transformation from an academic tool into a platform for commerce and entertainment.

### HTML 3.2: Tables and Layout (1997)

HTML 3.2 introduced tables, which revolutionized how content could be presented on web pages. While tables were intended for displaying tabular data, developers quickly discovered they could be used to create complex page layouts. This led to an era of table-based design that dominated the web for many years.

This version also added support for applets, allowing Java programs to be embedded in web pages. Text flow around images was improved, and various new formatting options were introduced. However, the focus on presentation features would later be recognized as problematic, leading to a philosophy shift in subsequent versions.

### HTML 4.0 and 4.01: Separation of Concerns (1997-1999)

HTML 4.0 represented a major philosophical shift in web development. For the first time, the specification explicitly encouraged the separation of content (HTML) from presentation (CSS). This version introduced improved support for stylesheets, better internationalization features, and enhanced accessibility support.

Scripting support was formalized, laying the groundwork for the dynamic, interactive websites we know today. The concept of frames was introduced, allowing multiple HTML documents to be displayed in a single browser window. While frames were later deprecated due to accessibility and usability issues, they demonstrated the web's evolution toward more application-like experiences.

### HTML5: The Modern Foundation (2014)

HTML5 represents the current state of the art in web markup. Development began in 2004, but the specification wasn't finalized until 2014. This long development cycle allowed for extensive testing and refinement, resulting in a standard that balances innovation with stability.

HTML5 introduced numerous semantic elements that make HTML more meaningful and accessible. Elements like \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<aside>\`, and \`<footer>\` provide clear structure that both humans and machines can understand. These elements represent a return to HTML's semantic roots while providing the tools needed for modern web development.

## Semantic HTML: The Art of Meaningful Markup

Modern HTML development emphasizes semantic markup—choosing elements based on their meaning rather than their appearance. This approach has profound implications for accessibility, search engine optimization, code maintainability, and future compatibility.

### The Power of Semantic Elements

HTML5 introduced numerous semantic elements that provide clear meaning and structure to web documents. The \`<header>\` element represents introductory content or navigational aids. The \`<nav>\` element contains navigation links. The \`<main>\` element represents the dominant content of the document. The \`<section>\` element represents a distinct section of content, while \`<article>\` represents a self-contained piece of content that could stand alone.

These semantic elements replace the generic \`<div>\` elements that were overused in earlier web development. While \`<div>\` elements are still useful for styling and layout purposes, semantic elements provide meaning that both humans and machines can understand and act upon.

### Document Structure and Accessibility

Proper HTML structure is crucial for creating accessible web experiences. Screen readers and other assistive technologies rely on semantic markup to understand content relationships and provide navigation shortcuts to users. A well-structured HTML document enables users with disabilities to navigate efficiently and understand content context.

The importance of accessibility extends beyond users with permanent disabilities. Temporary impairments, situational limitations, and aging-related changes affect everyone at some point. Good semantic HTML creates a foundation that benefits all users while ensuring compliance with accessibility standards and regulations.

## Forms and User Interaction

HTML forms represent one of the most important aspects of web development, enabling the collection and submission of user data. Modern HTML5 forms provide extensive capabilities for input validation, user experience enhancement, and accessibility support.

Form structure should be logical and intuitive, with related fields grouped using \`<fieldset>\` elements and described with \`<legend>\` elements. Every form control should have an associated label that clearly describes its purpose. This labeling is essential for screen readers and improves usability for all users.

HTML5 introduced numerous specialized input types that provide better user experiences and built-in validation. Email inputs validate email addresses, URL inputs validate web addresses, and date inputs provide native date pickers on supporting devices. These modern input types reduce the need for custom JavaScript solutions and provide more consistent user experiences.

## Performance and Best Practices

Modern web development requires careful attention to performance optimization. HTML plays a crucial role in site speed through efficient markup, proper resource loading, and strategic use of modern browser features.

Clean, semantic HTML naturally performs better than complex, nested markup. Browsers can parse and render semantic elements more efficiently, and smaller file sizes reduce download times. Image optimization is crucial for performance, with modern HTML providing tools like responsive images and lazy loading to improve page load times.

The separation of content, presentation, and behavior remains a fundamental principle of good web development. HTML should focus on content structure and meaning, CSS should handle visual presentation, and JavaScript should manage interactive behavior. This separation improves maintainability, performance, and accessibility.

## The Future of HTML

HTML continues to evolve with new features and capabilities being developed through collaborative standards processes. Future developments focus on improving developer experience, enhancing accessibility, and enabling new types of web applications.

Web Components represent a significant evolution in HTML development, allowing developers to create reusable, encapsulated custom elements. Progressive Web Apps use HTML foundations to create app-like experiences that can work offline and be installed on user devices.

The web platform continues to mature as a serious application development target, with HTML serving as the foundational layer that enables rich, accessible, and performant user experiences across an ever-expanding range of devices and contexts.

## Conclusion: Mastering the Foundation

HTML may appear simple on the surface, but its depth and nuance reward careful study and thoughtful application. The principles of semantic markup, accessibility-first design, and performance optimization provide a solid foundation for all web development work.

As you continue your web development journey, remember that HTML is more than just markup—it's a tool for creating meaningful, accessible experiences that can be used by anyone, anywhere, on any device. The decisions you make when writing HTML have real impacts on real people, from the accessibility of your content to the performance of your sites.

The web is a platform for everyone, and understanding HTML fundamentals ensures that your contributions help maintain and improve this universal accessibility. Master these foundations, and you'll be prepared for whatever the future of web development brings.
        ` },
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
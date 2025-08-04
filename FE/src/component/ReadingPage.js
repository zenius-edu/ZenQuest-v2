import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, Share, Bookmark, Eye, Sun, Moon, Type, Minus, Plus, Settings } from 'lucide-react';

const ReadingPage = ({ onNavigate, selectedPlan, selectedChapter }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);
  const [fontFamily, setFontFamily] = useState('serif');

  // Default data jika tidak ada yang dipilih
  const defaultChapter = {
    id: 1,
    title: "HTML Fundamentals",
    readingTime: "45 min",
    content: `
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
    `
  };

  const chapter = selectedChapter || window.zenverseSelectedChapter || defaultChapter;
  const plan = selectedPlan || window.zenverseSelectedPlan || { title: "Frontend Development", icon: "💻", bgColor: "from-blue-400 to-blue-500" };

  // Simulate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 14));
  };

  const formatContent = (content) => {
    // Add safety check for undefined content
    if (!content || typeof content !== 'string') {
      return <p className={`leading-loose mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontSize: `${fontSize}px` }}>No content available.</p>;
    }

    return content
      .split('\n')
      .map((line, index) => {
        const baseTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
        const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';
        
        // Headers
        if (line.startsWith('# ')) {
          return (
            <h1 
              key={index} 
              className={`font-bold ${headingClass} mt-12 mb-6 first:mt-8 leading-tight`}
              style={{ fontSize: `${fontSize + 16}px` }}
            >
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 
              key={index} 
              className={`font-bold ${headingClass} mt-10 mb-5 leading-snug`}
              style={{ fontSize: `${fontSize + 10}px` }}
            >
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 
              key={index} 
              className={`font-semibold ${headingClass} mt-8 mb-4 leading-snug`}
              style={{ fontSize: `${fontSize + 4}px` }}
            >
              {line.substring(4)}
            </h3>
          );
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          const language = line.substring(3);
          return (
            <div 
              key={index} 
              className={`text-xs mt-6 mb-2 font-mono uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
            >
              {language}
            </div>
          );
        }
        
        // Bold text
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <p 
              key={index} 
              className={`${baseTextClass} leading-loose mb-5`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {parts.map((part, i) => i % 2 === 1 ? 
                <strong key={i} className={`font-semibold ${headingClass}`}>{part}</strong> : part
              )}
            </p>
          );
        }
        
        // Code inline
        if (line.includes('`') && !line.startsWith('```')) {
          const parts = line.split('`');
          return (
            <p 
              key={index} 
              className={`${baseTextClass} leading-loose mb-5`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {parts.map((part, i) => i % 2 === 1 ? 
                <code 
                  key={i} 
                  className={`${isDarkMode ? 'bg-gray-700 border-gray-600 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-700'} border px-2 py-1 rounded font-mono`}
                  style={{ fontSize: `${fontSize - 2}px` }}
                >
                  {part}
                </code> : part
              )}
            </p>
          );
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return (
            <li 
              key={index} 
              className={`${baseTextClass} leading-loose mb-3 ml-6`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {line.substring(2)}
            </li>
          );
        }
        
        // Regular paragraphs
        if (line.trim() && !line.startsWith('#') && !line.startsWith('```')) {
          return (
            <p 
              key={index} 
              className={`${baseTextClass} leading-loose mb-6`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {line}
            </p>
          );
        }
        
        // Empty lines
        return <div key={index} className="mb-4"></div>;
      });
  };

  const fontFamilyClass = fontFamily === 'serif' ? 'font-serif' : fontFamily === 'sans' ? 'font-sans' : 'font-mono';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Fixed Navigation Bar */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
          {/* Left: Back Button - Just Icon */}
          <button 
            onClick={handleBack}
            className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Center: Chapter Info */}
          <div className="flex-1 text-center px-4 min-w-0">
            <h3 className={`font-semibold text-base truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{chapter.title}</h3>
            <div className="flex items-center justify-center space-x-1 mt-0.5">
              <Clock className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{chapter.readingTime}</span>
            </div>
          </div>

          {/* Right: Empty space for balance */}
          <div className="w-9 h-9"></div>
        </div>
      </div>

      {/* Floating Settings Button - Bottom Right */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`fixed bottom-32 right-6 z-[60] w-12 h-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 flex items-center justify-center ${isDarkMode ? 'bg-gray-800/95 hover:bg-gray-700/95 text-white border border-gray-600' : 'bg-white/95 hover:bg-gray-50/95 text-gray-700 border border-gray-300'}`}
        style={{
          boxShadow: isDarkMode 
            ? '0 6px 20px -5px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' 
            : '0 6px 20px -5px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`fixed bottom-48 right-6 z-[60] p-3 rounded-xl shadow-xl border transition-all duration-300 w-64 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h4 className={`font-semibold mb-3 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reading Settings</h4>
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Font Size</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={decreaseFontSize}
                className={`p-1 rounded transition-colors ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className={`text-sm w-8 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{fontSize}</span>
              <button
                onClick={increaseFontSize}
                className={`p-1 rounded transition-colors ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Font Family Selection */}
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Font Style</span>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className={`text-xs px-2 py-1 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
            >
              <option value="serif">Serif</option>
              <option value="sans">Sans</option>
              <option value="mono">Mono</option>
            </select>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="pt-16 px-6 pb-12 max-w-4xl mx-auto">
        {/* Reading Content */}
        <article className="prose prose-xl max-w-none">
          <div className={`leading-relaxed transition-all duration-300 ${fontFamilyClass} ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            {formatContent(chapter.content)}
          </div>
        </article>
      </div>

      {/* Bottom padding for safe area */}
      <div className="pb-24"></div>
    </div>
  );
};

export default ReadingPage; 
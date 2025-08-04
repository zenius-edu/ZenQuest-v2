import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, CheckCircle, Play, ChevronRight } from 'lucide-react';

const ReadingMaterial = ({ onNavigate, selectedPlan }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [completedChapters, setCompletedChapters] = useState(new Set());

  // Default plan jika tidak ada yang dipilih
  const defaultPlan = {
    id: 1,
    title: "Frontend Development Plan",
    description: "Complete frontend development journey",
    bgColor: "from-blue-400 to-blue-500",
    icon: "💻",
    chapters: [
      {
        id: 1,
        title: "HTML Fundamentals",
        readingTime: "15 min",
        content: `
# HTML Fundamentals

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup.

## What is HTML?

HTML consists of a series of elements, which you use to enclose, or wrap, different parts of the content to make it appear or act a certain way.

## Basic HTML Structure

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>
</html>
\`\`\`

## Common HTML Elements

- **Headings**: \`<h1>\` to \`<h6>\`
- **Paragraphs**: \`<p>\`
- **Links**: \`<a href="url">Link text</a>\`
- **Images**: \`<img src="image.jpg" alt="description">\`
- **Lists**: \`<ul>\`, \`<ol>\`, \`<li>\`

## Best Practices

1. Always use semantic HTML elements
2. Include proper alt attributes for images
3. Use proper heading hierarchy
4. Validate your HTML code
        `
      },
      {
        id: 2,
        title: "CSS Styling",
        readingTime: "20 min",
        content: `
# CSS Styling

CSS (Cascading Style Sheets) is used to style and layout web pages. It describes how HTML elements should be displayed.

## CSS Syntax

\`\`\`css
selector {
    property: value;
}
\`\`\`

## CSS Selectors

- **Element selector**: \`p { color: blue; }\`
- **Class selector**: \`.myClass { color: red; }\`
- **ID selector**: \`#myId { color: green; }\`

## Box Model

Every element in CSS has a box model consisting of:
1. Content
2. Padding
3. Border
4. Margin

## Flexbox Layout

\`\`\`css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
\`\`\`
        `
      },
      {
        id: 3,
        title: "JavaScript Basics",
        readingTime: "25 min",
        content: `
# JavaScript Basics

JavaScript is a programming language that enables interactive web pages. It's an essential part of web applications.

## Variables

\`\`\`javascript
let name = "John";
const age = 25;
var city = "New York";
\`\`\`

## Functions

\`\`\`javascript
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const greet = (name) => "Hello, " + name + "!";
\`\`\`

## DOM Manipulation

\`\`\`javascript
// Select elements
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');

// Modify content
element.textContent = 'New content';
element.innerHTML = '<strong>Bold text</strong>';
\`\`\`

## Event Handling

\`\`\`javascript
button.addEventListener('click', function() {
    console.log('Button clicked!');
});
\`\`\`
        `
      },
      {
        id: 4,
        title: "DOM Manipulation",
        readingTime: "18 min",
        content: `
# DOM Manipulation

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page so that programs can change the document structure, style, and content.

## Selecting Elements

\`\`\`javascript
// By ID
const element = document.getElementById('myId');

// By class name
const elements = document.getElementsByClassName('myClass');

// By query selector
const element = document.querySelector('.myClass');
const elements = document.querySelectorAll('div');
\`\`\`

## Creating and Modifying Elements

\`\`\`javascript
// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';

// Append to parent
document.body.appendChild(newDiv);

// Modify attributes
element.setAttribute('class', 'newClass');
element.classList.add('active');
\`\`\`
        `
      },
      {
        id: 5,
        title: "React Components",
        readingTime: "30 min",
        content: `
# React Components

React components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

## Function Components

\`\`\`jsx
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Welcome = (props) => {
    return <h1>Hello, {props.name}!</h1>;
};
\`\`\`

## JSX

JSX is a syntax extension for JavaScript that looks similar to HTML:

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

## Props

Props are arguments passed into React components:

\`\`\`jsx
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

<Welcome name="Alice" />
\`\`\`

## State with Hooks

\`\`\`jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
\`\`\`
        `
      }
    ]
  };

  const plan = selectedPlan || defaultPlan;

  const handleBack = () => {
    if (selectedChapter) {
      setSelectedChapter(null);
    } else if (onNavigate) {
      onNavigate('course-result');
    }
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  const markAsCompleted = (chapterId) => {
    const newCompleted = new Set(completedChapters);
    if (newCompleted.has(chapterId)) {
      newCompleted.delete(chapterId);
    } else {
      newCompleted.add(chapterId);
    }
    setCompletedChapters(newCompleted);
  };

  // Chapter List View
  if (!selectedChapter) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pb-32">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-8 pb-12">
            <div className="flex items-center mb-4">
              <button 
                onClick={handleBack}
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white">Reading Material</h1>
                <p className="text-orange-100 text-sm">{plan.title}</p>
              </div>
            </div>
            
            {/* Curved Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-white" style={{
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
            }}></div>
          </div>

          {/* Plan Info */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${plan.bgColor} rounded-full flex items-center justify-center`}>
                <span className="text-xl">{plan.icon}</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{plan.title}</h2>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>
            </div>
          </div>

          {/* Chapters List */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Chapters</h3>
            <div className="space-y-3">
              {plan.chapters?.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter)}
                  className="w-full bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 border border-orange-200 rounded-2xl p-4 transition-all duration-200 active:scale-95"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsCompleted(chapter.id);
                          }}
                          className={`w-5 h-5 rounded-full transition-colors duration-200 ${
                            completedChapters.has(chapter.id) 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        >
                          {completedChapters.has(chapter.id) && (
                            <CheckCircle className="w-3 h-3 text-white mx-auto" />
                          )}
                        </button>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">{chapter.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{chapter.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reading View
  return (
    <div className="min-h-screen bg-white">
      <div className="pb-32">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1 text-center px-4">
                <h1 className="font-bold text-gray-900">{selectedChapter.title}</h1>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">{selectedChapter.readingTime}</span>
                </div>
              </div>
              <button
                onClick={() => markAsCompleted(selectedChapter.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  completedChapters.has(selectedChapter.id)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className={`w-5 h-5 ${
                  completedChapters.has(selectedChapter.id) ? 'text-white' : 'text-gray-600'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-line text-gray-800 leading-relaxed">
              {selectedChapter.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingMaterial; 
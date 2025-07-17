import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, CheckCircle, Share, Bookmark, Eye } from 'lucide-react';

const ReadingPage = ({ onNavigate, selectedPlan, selectedChapter }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Default data jika tidak ada yang dipilih
  const defaultChapter = {
    id: 1,
    title: "HTML Fundamentals",
    readingTime: "15 min",
    content: `
# HTML Fundamentals: Building the Foundation of the Web

HTML (HyperText Markup Language) is the cornerstone of web development and the fundamental building block that powers every website you visit. Created by Tim Berners-Lee in 1990, HTML has evolved from a simple document markup language into a sophisticated platform for creating rich, interactive web experiences.

## The Journey of HTML: From Simple Documents to Web Applications

In the early days of the internet, HTML was designed to solve a simple problem: how to share scientific documents between researchers. What started as a way to link academic papers has grown into the universal language of the web, powering everything from simple blogs to complex web applications.

HTML's beauty lies in its simplicity and universality. Unlike proprietary document formats that require specific software to view, HTML documents can be opened by any web browser on any device. This cross-platform compatibility has made HTML the lingua franca of digital communication.

## Understanding the Philosophy Behind HTML

Before diving into the technical details, it's crucial to understand HTML's core philosophy. HTML is a markup language, not a programming language. This distinction is important because it shapes how we think about and use HTML.

Markup languages are designed to annotate text with structural and semantic information. When you write HTML, you're not giving the computer step-by-step instructions like you would in a programming language. Instead, you're describing the structure and meaning of your content.

Think of HTML as a way to tell a story about your content. Every element you use should have a purpose and meaning that contributes to the overall narrative of your webpage. This semantic approach to markup is what makes HTML so powerful and accessible.

## The Anatomy of an HTML Document

Every HTML document follows a carefully designed structure that browsers understand and interpret. Let's explore this structure in detail:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Understanding HTML Structure</title>
    <meta name="description" content="A comprehensive guide to HTML fundamentals">
    <meta name="author" content="ZenVerse Learning">
</head>
<body>
    <header>
        <h1>Welcome to HTML Fundamentals</h1>
        <nav>
            <ul>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#elements">Elements</a></li>
                <li><a href="#attributes">Attributes</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="introduction">
            <h2>What is HTML?</h2>
            <p>HTML is the standard markup language for creating web pages...</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 ZenVerse Learning Platform</p>
    </footer>
</body>
</html>
\`\`\`

### The Document Type Declaration

The \`<!DOCTYPE html>\` declaration at the beginning of every HTML5 document is more than just a formality. It tells the browser which version of HTML to expect and ensures that the page renders in standards mode rather than quirks mode.

In the early days of the web, different browsers interpreted HTML differently, leading to compatibility nightmares for developers. The DOCTYPE declaration helps ensure consistent rendering across different browsers and devices.

### The Root Element

The \`<html>\` element serves as the root container for all other elements on the page. The \`lang\` attribute is particularly important for accessibility and internationalization, as it helps screen readers pronounce content correctly and assists search engines in understanding the page's primary language.

### The Document Head

The \`<head>\` section contains metadata about the document that isn't displayed directly on the page but is crucial for browsers, search engines, and other tools. This includes:

**Character Encoding**: The \`<meta charset="UTF-8">\` declaration ensures that the browser interprets text correctly, supporting international characters and symbols.

**Viewport Settings**: The viewport meta tag controls how the page appears on mobile devices, enabling responsive design by allowing the page to adapt to different screen sizes.

**Page Title**: The \`<title>\` element appears in the browser's title bar and is used by search engines as the clickable headline in search results.

**Meta Descriptions**: These provide concise summaries of page content for search engines and social media platforms.

## HTML Elements: The Building Blocks of Content

HTML elements are the fundamental components that structure and give meaning to web content. Each element serves a specific purpose and follows consistent patterns in how it's written and used.

### Understanding Element Structure

Every HTML element follows a consistent structure:

\`\`\`html
<tagname attribute="value">Content goes here</tagname>
\`\`\`

The opening tag marks the beginning of an element, the closing tag marks the end, and the content goes between them. Some elements, called void elements, don't have closing tags because they don't contain content.

### Semantic HTML: Meaning Over Appearance

One of the most important concepts in modern HTML is semantic markup. Semantic elements clearly describe their meaning to both browsers and developers. Instead of thinking about how elements look, we should focus on what they mean.

For example, instead of using a \`<div>\` with styling to create a heading, we use the appropriate heading element (\`<h1>\`, \`<h2>\`, etc.). This approach has several benefits:

**Accessibility**: Screen readers and other assistive technologies rely on semantic HTML to navigate and understand content structure.

**SEO**: Search engines use semantic markup to better understand and index content.

**Maintainability**: Code with clear semantic meaning is easier to understand and maintain.

**Future-proofing**: Semantic markup ensures that content remains meaningful even as styling changes.

### Headings: Creating Information Hierarchy

HTML provides six levels of headings, from \`<h1>\` (most important) to \`<h6>\` (least important). These create a hierarchical structure that helps both users and search engines understand content organization.

\`\`\`html
<h1>Main Page Title</h1>
<h2>Major Section</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>
\`\`\`

**Best Practices for Headings**:
- Use only one \`<h1>\` per page for the main title
- Don't skip heading levels (don't jump from \`<h1>\` to \`<h3>\`)
- Use headings for structure, not styling
- Keep headings descriptive and meaningful

### Paragraphs: The Foundation of Content

The \`<p>\` element represents a paragraph of text. While this seems simple, proper paragraph usage is crucial for readable, accessible content.

\`\`\`html
<p>This is the first paragraph of content. It contains several sentences that form a complete thought or idea.</p>

<p>This is a second paragraph. Notice how it's separate from the first paragraph, creating visual and logical separation between ideas.</p>
\`\`\`

### Links: Connecting the Web

Hyperlinks are what make the web truly "web-like," connecting different pages and resources. The \`<a>\` (anchor) element creates these connections.

\`\`\`html
<!-- External link -->
<a href="https://www.example.com">Visit Example.com</a>

<!-- Internal link to another page -->
<a href="/about.html">About Us</a>

<!-- Link to section on same page -->
<a href="#contact">Go to Contact Section</a>

<!-- Email link -->
<a href="mailto:hello@example.com">Send us an email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call us</a>
\`\`\`

**Link Accessibility**: Always write descriptive link text that makes sense out of context. Avoid generic phrases like "click here" or "read more."

### Images: Visual Communication

Images add visual interest and can convey information that words alone cannot. The \`<img>\` element embeds images in HTML documents.

\`\`\`html
<img src="landscape.jpg" 
     alt="A serene mountain landscape with snow-capped peaks reflected in a crystal-clear lake" 
     width="800" 
     height="600">
\`\`\`

**The Importance of Alt Text**: The \`alt\` attribute provides alternative text for images, which is crucial for accessibility and SEO. Write alt text that describes the image's content and context.

### Lists: Organizing Information

HTML provides three types of lists, each serving different purposes:

**Unordered Lists** for items without a specific order:

\`\`\`html
<ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Oranges</li>
    <li>Grapes</li>
</ul>
\`\`\`

**Ordered Lists** for sequential or ranked items:

\`\`\`html
<ol>
    <li>Preheat the oven to 350°F</li>
    <li>Mix the dry ingredients</li>
    <li>Add wet ingredients gradually</li>
    <li>Bake for 25-30 minutes</li>
</ol>
\`\`\`

**Description Lists** for term-definition pairs:

\`\`\`html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language, the standard markup language for web pages</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets, used for styling and layout of web pages</dd>
    
    <dt>JavaScript</dt>
    <dd>A programming language that enables interactive web pages</dd>
</dl>
\`\`\`

## HTML Attributes: Adding Meaning and Functionality

Attributes provide additional information about HTML elements, modifying their behavior or appearance. They're written as name-value pairs within the opening tag.

### Universal Attributes

Some attributes can be used on any HTML element:

**id**: Creates a unique identifier for an element
\`\`\`html
<div id="main-content">This div has a unique identifier</div>
\`\`\`

**class**: Assigns one or more class names for styling and scripting
\`\`\`html
<p class="highlight important">This paragraph has two classes</p>
\`\`\`

**title**: Provides advisory information, typically shown as a tooltip
\`\`\`html
<abbr title="World Wide Web">WWW</abbr>
\`\`\`

**lang**: Specifies the language of the element's content
\`\`\`html
<blockquote lang="fr">Bonjour le monde</blockquote>
\`\`\`

### Element-Specific Attributes

Many attributes are specific to certain elements:

**href** for links:
\`\`\`html
<a href="https://www.example.com">External link</a>
\`\`\`

**src** for images and media:
\`\`\`html
<img src="photo.jpg" alt="Description">
\`\`\`

**type** for inputs:
\`\`\`html
<input type="email" placeholder="Enter your email">
\`\`\`

## Modern HTML5 Semantic Elements

HTML5 introduced many new semantic elements that provide better structure and meaning to web documents:

### Structural Elements

**\`<header>\`**: Represents introductory content or navigational aids
**\`<nav>\`**: Contains navigation links
**\`<main>\`**: Represents the dominant content of the document
**\`<section>\`**: Represents a distinct section of content
**\`<article>\`**: Represents a self-contained piece of content
**\`<aside>\`**: Represents content tangentially related to the main content
**\`<footer>\`**: Represents footer information

\`\`\`html
<header>
    <h1>My Blog</h1>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <header>
            <h2>Article Title</h2>
            <time datetime="2024-01-15">January 15, 2024</time>
        </header>
        <p>Article content goes here...</p>
    </article>
    
    <aside>
        <h3>Related Articles</h3>
        <ul>
            <li><a href="/related-1">Related Article 1</a></li>
            <li><a href="/related-2">Related Article 2</a></li>
        </ul>
    </aside>
</main>

<footer>
    <p>&copy; 2024 My Blog. All rights reserved.</p>
</footer>
\`\`\`

## Forms: Collecting User Input

HTML forms are essential for interactive websites, allowing users to submit data to servers. Modern HTML5 provides many input types and validation features.

\`\`\`html
<form action="/submit" method="post">
    <fieldset>
        <legend>Personal Information</legend>
        
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone">
        
        <label for="birthdate">Birth Date:</label>
        <input type="date" id="birthdate" name="birthdate">
    </fieldset>
    
    <fieldset>
        <legend>Preferences</legend>
        
        <label for="newsletter">
            <input type="checkbox" id="newsletter" name="newsletter">
            Subscribe to newsletter
        </label>
        
        <fieldset>
            <legend>Preferred Contact Method</legend>
            <label>
                <input type="radio" name="contact" value="email">
                Email
            </label>
            <label>
                <input type="radio" name="contact" value="phone">
                Phone
            </label>
        </fieldset>
    </fieldset>
    
    <button type="submit">Submit Form</button>
</form>
\`\`\`

## Best Practices for Writing Quality HTML

### 1. Write Valid, Well-Formed HTML

Always validate your HTML using tools like the W3C Markup Validator. Valid HTML ensures consistent rendering across browsers and helps avoid unexpected issues.

### 2. Use Semantic Elements Appropriately

Choose elements based on their meaning, not their default styling. This makes your content more accessible and meaningful to both users and machines.

### 3. Maintain Proper Document Structure

Create a logical heading hierarchy, use appropriate sectioning elements, and ensure your document flows in a meaningful way.

### 4. Optimize for Accessibility

- Provide alt text for images
- Use proper heading structure
- Ensure sufficient color contrast
- Make forms accessible with proper labels
- Test with screen readers

### 5. Consider Performance

- Optimize images for web use
- Minimize HTTP requests
- Use appropriate image formats
- Consider lazy loading for images below the fold

### 6. Plan for Responsive Design

Write HTML that works well across different devices and screen sizes. Use semantic elements and avoid fixed widths in your HTML structure.

## Common HTML Mistakes to Avoid

### 1. Missing or Incorrect DOCTYPE

Always include \`<!DOCTYPE html>\` at the beginning of your documents.

### 2. Improper Nesting

Ensure elements are properly nested and closed in the correct order.

### 3. Using Deprecated Elements

Avoid outdated elements like \`<font>\`, \`<center>\`, and \`<marquee>\`. Use CSS for styling instead.

### 4. Missing Alt Attributes

Always provide meaningful alt text for images.

### 5. Incorrect Use of Headings

Don't skip heading levels or use headings solely for styling purposes.

## The Future of HTML

HTML continues to evolve with new features and capabilities being added regularly. Some areas of ongoing development include:

**Web Components**: Creating reusable, encapsulated HTML elements
**Progressive Web Apps**: Using HTML, CSS, and JavaScript to create app-like experiences
**Accessibility Improvements**: Better support for assistive technologies
**Performance Optimizations**: New elements and attributes for faster loading

## Conclusion: Building a Strong Foundation

Mastering HTML fundamentals is essential for any web developer. While modern frameworks and tools may abstract away some of the complexity, understanding the underlying HTML structure remains crucial for creating accessible, maintainable, and performant web applications.

Remember that HTML is not just about creating web pages—it's about creating meaningful, structured documents that can be understood by humans and machines alike. As you continue your web development journey, always consider the semantic meaning of your markup and strive to create content that is accessible to all users.

The skills you develop with HTML will serve as the foundation for everything else you learn in web development. CSS will help you style your HTML, JavaScript will make it interactive, and frameworks will help you organize it—but HTML remains the essential building block that makes it all possible.

Take time to practice these concepts, experiment with different elements and attributes, and always keep accessibility and semantic meaning at the forefront of your mind. With a solid understanding of HTML fundamentals, you'll be well-prepared to tackle any web development challenge that comes your way.
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
      onNavigate('course-result');
    }
  };

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const formatContent = (content) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-bold text-gray-900 mt-12 mb-6 first:mt-8 leading-tight">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-3xl font-bold text-gray-800 mt-10 mb-5 leading-snug">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-2xl font-semibold text-gray-800 mt-8 mb-4 leading-snug">{line.substring(4)}</h3>;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          const language = line.substring(3);
          return <div key={index} className="text-xs text-gray-500 mt-6 mb-2 font-mono uppercase tracking-wide">{language}</div>;
        }
        
        // Bold text
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <p key={index} className="text-gray-700 leading-loose mb-5 text-lg">
              {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part)}
            </p>
          );
        }
        
        // Code inline
        if (line.includes('`') && !line.startsWith('```')) {
          const parts = line.split('`');
          return (
            <p key={index} className="text-gray-700 leading-loose mb-5 text-lg">
              {parts.map((part, i) => i % 2 === 1 ? 
                <code key={i} className="bg-orange-50 border border-orange-200 px-2 py-1 rounded text-base font-mono text-orange-700">{part}</code> : part
              )}
            </p>
          );
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return <li key={index} className="text-gray-700 leading-loose mb-3 ml-6 text-lg">{line.substring(2)}</li>;
        }
        
        // Regular paragraphs
        if (line.trim() && !line.startsWith('#') && !line.startsWith('```')) {
          return <p key={index} className="text-gray-700 leading-loose mb-6 text-lg">{line}</p>;
        }
        
        // Empty lines
        return <div key={index} className="mb-4"></div>;
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Content - iBook style */}
      <div className="px-8 py-12 max-w-4xl mx-auto">
        {/* Back Button - Floating */}
        <button 
          onClick={handleBack}
          className="fixed top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 shadow-lg rounded-full flex items-center justify-center transition-all duration-200 z-40"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Reading Content */}
        <article className="prose prose-xl max-w-none">
          <div className="text-gray-800 leading-relaxed font-serif">
            {formatContent(chapter.content)}
          </div>
        </article>

        {/* Bottom Actions */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleCompleted}
              className={`flex items-center space-x-3 px-8 py-4 rounded-full font-medium transition-all duration-200 text-lg ${
                isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
            </button>
            
            <div className="text-lg text-gray-500 font-medium">
              {Math.round(readingProgress)}% read
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding for safe area */}
      <div className="pb-24"></div>
    </div>
  );
};

export default ReadingPage; 
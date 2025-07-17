import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, CheckCircle, Share, Bookmark, Eye } from 'lucide-react';

const ReadingPage = ({ onNavigate, selectedPlan, selectedChapter }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

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

## The Evolution Through Decades

### HTML 1.0: The Humble Beginning (1991)

The original HTML specification was remarkably simple, containing just 18 elements. These included basic structural elements like headings (\`<h1>\` through \`<h6>\`), paragraphs (\`<p>\`), and the revolutionary anchor element (\`<a>\`) that made hyperlinks possible. There were also elements for lists, basic text formatting, and a few other essential features.

Despite its simplicity, this first version established principles that remain important today. Elements had semantic meaning—a heading was marked as a heading, not just text that looked bigger. Links could connect to any document anywhere on the emerging World Wide Web. The foundation was laid for a truly universal information sharing system.

### HTML 2.0: Standardization and Forms (1995)

As the web began to grow rapidly in the early 1990s, it became clear that HTML needed to be standardized and expanded. HTML 2.0 was the first version to be published as an official standard by the Internet Engineering Task Force (IETF). This version introduced several crucial features that transformed the web from a read-only medium into an interactive platform.

Forms were perhaps the most significant addition, enabling websites to collect user input for the first time. Suddenly, the web could support everything from simple feedback forms to complex applications. Image embedding was also formalized, allowing websites to include graphics alongside text. These additions marked the beginning of the web's transformation from an academic tool into a platform for commerce and entertainment.

The standardization process also established important principles about backward compatibility and extensibility. New versions of HTML would need to work with existing content, while providing pathways for future innovation. This balance between stability and progress would become a defining characteristic of web standards development.

### HTML 3.2: Tables and Layout (1997)

HTML 3.2 introduced tables, which revolutionized how content could be presented on web pages. While tables were intended for displaying tabular data, developers quickly discovered they could be used to create complex page layouts. This led to an era of table-based design that dominated the web for many years.

This version also added support for applets, allowing Java programs to be embedded in web pages. Text flow around images was improved, and various new formatting options were introduced. However, the focus on presentation features would later be recognized as problematic, leading to a philosophy shift in subsequent versions.

The table-based layout era taught important lessons about the separation of content and presentation. While tables could create sophisticated designs, they made websites difficult to maintain, less accessible to users with disabilities, and challenging to adapt for different screen sizes. These challenges would drive the development of CSS and more semantic approaches to HTML.

### HTML 4.0 and 4.01: Separation of Concerns (1997-1999)

HTML 4.0 represented a major philosophical shift in web development. For the first time, the specification explicitly encouraged the separation of content (HTML) from presentation (CSS). This version introduced improved support for stylesheets, better internationalization features, and enhanced accessibility support.

Scripting support was formalized, laying the groundwork for the dynamic, interactive websites we know today. The concept of frames was introduced, allowing multiple HTML documents to be displayed in a single browser window. While frames were later deprecated due to accessibility and usability issues, they demonstrated the web's evolution toward more application-like experiences.

Perhaps most importantly, HTML 4.01 established many of the accessibility principles that remain crucial today. The specification emphasized the importance of alternative text for images, proper heading structures, and semantic markup that could be understood by assistive technologies. These principles would prove prescient as the web became an essential platform for communication and commerce.

### XHTML: The XML Experiment (2000-2001)

XHTML represented an attempt to reformulate HTML using XML syntax rules. This meant that all elements had to be properly closed, attribute values had to be quoted, and documents had to be well-formed according to strict XML rules. The goal was to make HTML more consistent and easier to process programmatically.

While XHTML never achieved widespread adoption in its pure form, it had a profound influence on web development practices. Many developers adopted XHTML-style writing habits—closing all tags, using lowercase element names, and properly structuring documents. These practices improved code quality and consistency across the web development community.

The XHTML experiment also demonstrated the importance of pragmatism in web standards. Despite its technical advantages, XHTML's strict requirements made it difficult to implement and maintain. This lesson would influence the development of HTML5, which prioritized practical compatibility over theoretical purity.

### HTML5: The Modern Foundation (2014)

HTML5 represents the current state of the art in web markup. Development began in 2004, but the specification wasn't finalized until 2014. This long development cycle allowed for extensive testing and refinement, resulting in a standard that balances innovation with stability.

HTML5 introduced numerous semantic elements that make HTML more meaningful and accessible. Elements like \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<aside>\`, and \`<footer>\` provide clear structure that both humans and machines can understand. These elements represent a return to HTML's semantic roots while providing the tools needed for modern web development.

Multimedia support was revolutionized with the introduction of \`<video>\` and \`<audio>\` elements, eliminating the need for plugins like Flash for basic media playback. The \`<canvas>\` element opened up possibilities for graphics and games, while new form input types improved user experience on mobile devices.

Perhaps most significantly, HTML5 redefined HTML from a document format into an application platform. New APIs for local storage, geolocation, offline functionality, and real-time communication transformed what was possible with web technologies. The web could now compete with native applications for many use cases.

## The Anatomy of HTML: Understanding Document Structure

Every HTML document follows a carefully designed structure that serves multiple purposes. This structure isn't arbitrary—each part has specific functions that contribute to the document's accessibility, searchability, and maintainability.

### The Document Type Declaration

Every HTML5 document begins with \`<!DOCTYPE html>\`, a simple declaration that serves several important functions. This declaration tells the browser to render the page in standards mode, ensuring consistent behavior across different browsers and devices. Without a proper DOCTYPE, browsers might render pages in "quirks mode," attempting to maintain compatibility with legacy websites by emulating older, non-standard behaviors.

The HTML5 DOCTYPE is refreshingly simple compared to earlier versions. Previous versions of HTML required long, complex DOCTYPE declarations that were difficult to remember and type correctly. HTML5's simple declaration reflects the standard's emphasis on practicality and ease of use.

### The Root Element and Language

The \`<html>\` element serves as the root container for all other elements in the document. Its \`lang\` attribute specifies the primary language of the content, which serves multiple important purposes. Screen readers use this information to pronounce content correctly, applying appropriate pronunciation rules and voice characteristics. Search engines use language information for geographic targeting and localization. Translation services use it to identify source and target languages for automatic translation.

The language declaration also affects how browsers handle text direction, typography, and other language-specific features. For international websites, proper language declaration is essential for providing good user experiences across different cultures and regions.

### The Document Head: Metadata and Resources

The \`<head>\` section contains metadata about the document that isn't displayed directly on the page but is crucial for proper rendering, search engine optimization, and accessibility. This section typically includes character encoding declaration, viewport settings, page title, meta descriptions, and links to external resources like stylesheets and scripts.

Character encoding declaration (\`<meta charset="UTF-8">\`) is particularly important because it determines how browsers interpret text characters. UTF-8 encoding supports all Unicode characters, making it possible to display text in any language or script. Without proper encoding declaration, international characters and special symbols might display incorrectly.

The viewport meta tag (\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`) controls how pages appear on mobile devices. Before responsive design became standard, mobile browsers would render pages at desktop width and then scale them down, resulting in tiny, unreadable text. The viewport meta tag tells mobile browsers to use the device's actual width and allows for proper responsive design.

## Semantic HTML: The Art of Meaningful Markup

Modern HTML development emphasizes semantic markup—choosing elements based on their meaning rather than their appearance. This approach has profound implications for accessibility, search engine optimization, code maintainability, and future compatibility.

### The Power of Semantic Elements

HTML5 introduced numerous semantic elements that provide clear meaning and structure to web documents. The \`<header>\` element represents introductory content or navigational aids. The \`<nav>\` element contains navigation links. The \`<main>\` element represents the dominant content of the document. The \`<section>\` element represents a distinct section of content, while \`<article>\` represents a self-contained piece of content that could stand alone.

These semantic elements replace the generic \`<div>\` elements that were overused in earlier web development. While \`<div>\` elements are still useful for styling and layout purposes, semantic elements provide meaning that both humans and machines can understand and act upon.

The \`<aside>\` element represents content that is tangentially related to the main content, such as sidebars, pull quotes, or advertisements. The \`<footer>\` element represents footer information for its nearest sectioning element or the document as a whole. These elements create a clear content hierarchy that improves navigation and understanding.

### Headings and Document Hierarchy

HTML provides six levels of headings, from \`<h1>\` (most important) to \`<h6>\` (least important). These headings create a hierarchical structure that serves multiple purposes. For users, headings provide a quick way to scan content and understand its organization. For assistive technologies, headings enable navigation shortcuts that allow users to jump between sections quickly.

Search engines use heading hierarchy to understand the relationship between different pieces of content and their relative importance. A well-structured heading hierarchy can improve search engine rankings and help search engines generate better page summaries and featured snippets.

Proper heading usage requires discipline and planning. Each page should have exactly one \`<h1>\` element representing the main topic. Subsequent headings should follow logical order without skipping levels. Headings should be chosen for their semantic meaning, not their visual appearance, which should be controlled through CSS.

### The Evolution of Text Markup

HTML provides numerous elements for marking up text with specific meanings. The \`<em>\` element indicates stress emphasis, typically rendered as italic text. The \`<strong>\` element indicates strong importance, typically rendered as bold text. However, the key is to choose these elements based on meaning, not appearance.

For specialized content, HTML offers elements like \`<code>\` for computer code, \`<kbd>\` for keyboard input, \`<samp>\` for sample output, and \`<var>\` for variables. The \`<mark>\` element highlights text for reference purposes, while \`<small>\` represents side comments and fine print.

Quotations have special elements: \`<q>\` for short inline quotations and \`<blockquote>\` for longer quotations. The \`<cite>\` element represents the title of a work being cited. These elements provide semantic meaning that enhances accessibility and enables better styling and behavior.

## Forms: The Gateway to Interaction

HTML forms represent one of the most important aspects of web development, enabling the collection and submission of user data. Modern HTML5 forms provide extensive capabilities for input validation, user experience enhancement, and accessibility support.

### Form Structure and Organization

Well-structured forms improve usability and accessibility. The \`<fieldset>\` element groups related form controls together, while the \`<legend>\` element provides a caption for the fieldset. This grouping helps users understand the relationship between different form fields and provides important context for assistive technologies.

Labels are crucial for accessibility and usability. Every form control should have an associated label that describes its purpose. The \`<label>\` element can be associated with form controls either by wrapping the control or by using the \`for\` attribute to reference the control's \`id\`. Proper labeling ensures that screen readers can identify form fields and that clicking on labels focuses or activates the associated controls.

### Modern Input Types and Validation

HTML5 introduced numerous specialized input types that provide better user experiences and built-in validation. The \`email\` input type provides email address validation and specialized mobile keyboards. The \`url\` input type validates web addresses. The \`tel\` input type is optimized for telephone numbers.

Numeric inputs include \`number\` for general numeric input and \`range\` for slider controls. Date and time inputs include \`date\`, \`time\`, \`datetime-local\`, \`month\`, and \`week\`. These specialized inputs provide native picker interfaces on supporting devices and automatic validation.

The \`color\` input type provides color picker interfaces, while the \`file\` input type handles file uploads with support for multiple files and file type restrictions. These modern input types reduce the need for custom JavaScript solutions and provide more consistent user experiences across different devices and browsers.

## Tables: Structured Data Display

HTML tables are designed specifically for displaying tabular data—information that naturally fits into rows and columns. Modern table markup emphasizes accessibility and semantic meaning while providing the flexibility needed for complex data presentation.

### Table Structure and Accessibility

Proper table structure includes several important elements. The \`<caption>\` element provides a title or summary for the table. The \`<thead>\`, \`<tbody>\`, and \`<tfoot>\` elements group table rows semantically. The \`<th>\` element represents header cells, while \`<td>\` represents data cells.

Header cells should use the \`scope\` attribute to indicate whether they apply to columns, rows, or groups of columns or rows. This information is crucial for screen readers to properly associate header information with data cells. Complex tables might also use the \`headers\` attribute on data cells to explicitly reference multiple header cells.

Table accessibility also involves proper use of the \`summary\` attribute (deprecated in HTML5 but still useful for legacy support) or descriptive captions that explain the table's purpose and structure. For complex tables, providing alternative formats or detailed descriptions can improve accessibility for users who have difficulty parsing tabular information.

### Responsive Table Design Considerations

Tables present unique challenges for responsive design because tabular data doesn't always adapt well to small screens. Various strategies exist for handling tables on mobile devices, including horizontal scrolling, stacked layouts, or abbreviated views with progressive disclosure.

The choice of responsive table strategy depends on the data being presented and the target audience. Financial data might require horizontal scrolling to maintain precision, while contact information might work well with stacked layouts. CSS techniques can transform table presentation while maintaining the semantic meaning of the HTML markup.

## Accessibility: Building an Inclusive Web

Web accessibility ensures that websites can be used by everyone, including people with disabilities. HTML provides the foundation for accessible web experiences through semantic markup, proper structure, and specific accessibility features.

### The Importance of Inclusive Design

Accessibility benefits extend far beyond users with permanent disabilities. Anyone might temporarily need accessibility features due to injury, environment, or technology limitations. Good accessibility practices also improve general usability, search engine optimization, and code maintainability.

The Web Content Accessibility Guidelines (WCAG) provide comprehensive guidance for creating accessible web content. These guidelines are organized around four principles: content must be perceivable, operable, understandable, and robust. HTML plays a crucial role in meeting these guidelines through proper semantic markup and structure.

### ARIA: Enhancing Accessibility

Accessible Rich Internet Applications (ARIA) specifications provide additional tools for creating accessible web applications. ARIA attributes can provide semantic information that isn't available through standard HTML elements, particularly important for dynamic content and custom user interface components.

ARIA roles describe what an element is or does. ARIA properties describe element properties like labels or descriptions. ARIA states describe current conditions like whether an element is expanded or selected. However, ARIA should supplement, not replace, good semantic HTML. The first rule of ARIA is that if a semantic HTML element exists for your use case, you should use it instead of adding ARIA to a generic element.

## Performance and Optimization

Modern web development requires careful attention to performance optimization. HTML plays a crucial role in site speed through efficient markup, proper resource loading, and strategic use of modern browser features.

### Efficient HTML Structure

Clean, semantic HTML naturally performs better than complex, nested markup. Browsers can parse and render semantic elements more efficiently, and smaller file sizes reduce download times. Avoiding unnecessary div containers and using appropriate semantic elements can improve both performance and maintainability.

Image optimization is crucial for performance. Modern HTML provides several tools for responsive images, including the \`srcset\` attribute for providing multiple image sizes and the \`<picture>\` element for art direction. The \`loading="lazy"\` attribute can defer image loading until images are needed, improving initial page load times.

### Resource Loading Strategies

HTML provides several mechanisms for optimizing resource loading. The \`<link>\` element supports resource hints like \`preconnect\`, \`preload\`, and \`prefetch\` that can improve performance by preparing for future resource needs. Script elements support \`async\` and \`defer\` attributes that control when and how JavaScript files are loaded and executed.

Critical resource prioritization involves identifying and optimizing the loading of resources needed for initial page rendering. This might involve inlining critical CSS, preloading important fonts, or using resource hints to prepare for third-party connections.

## The Future of HTML

HTML continues to evolve with new features and capabilities being developed through the Web Hypertext Application Technology Working Group (WHATWG) and the World Wide Web Consortium (W3C). Future developments focus on improving developer experience, enhancing accessibility, and enabling new types of web applications.

### Emerging Technologies

Web Components represent a significant evolution in HTML development, allowing developers to create reusable, encapsulated custom elements. The Custom Elements API enables the creation of new HTML elements with defined behavior. Shadow DOM provides encapsulation for styling and scripting. HTML Templates provide a mechanism for declaring fragments of markup that can be instantiated at runtime.

Progressive Web Apps (PWAs) use HTML, CSS, and JavaScript to create app-like experiences that can work offline, send push notifications, and be installed on user devices. Service Workers, Web App Manifests, and other PWA technologies build on HTML foundations to bridge the gap between web and native applications.

### Standards Development Process

HTML standards development involves extensive collaboration between browser vendors, web developers, accessibility experts, and other stakeholders. The process prioritizes backward compatibility, implementability, and real-world use cases. New features typically undergo extensive testing and refinement before being included in specifications.

The living standard approach means that HTML continues to evolve incrementally rather than through major version releases. This allows for more responsive adaptation to developer needs and emerging use cases while maintaining the stability that makes the web a reliable platform.

## Conclusion: Building a Strong Foundation

Mastering HTML fundamentals provides the foundation for all other web development skills. While modern frameworks and tools may abstract away some complexity, understanding the underlying HTML structure remains essential for creating accessible, maintainable, and performant web applications.

The principles covered in this comprehensive guide—semantic markup, accessibility-first design, performance optimization, and standards compliance—will serve you throughout your web development career. HTML may seem simple on the surface, but its depth and nuance reward careful study and thoughtful application.

As you continue your web development journey, remember that HTML is more than just markup—it's a tool for creating meaningful, accessible experiences that can be used by anyone, anywhere, on any device. The decisions you make when writing HTML have real impacts on real people, from the accessibility of your content to the performance of your sites.

The web is a platform for everyone, and your role as a developer is to ensure it remains that way. By mastering HTML fundamentals and applying them thoughtfully, you contribute to a web that is more accessible, more performant, and more meaningful for all users.

Keep learning, keep experimenting, and always remember the humans who will ultimately use the websites and applications you create. Good HTML is invisible to users, but it makes their experience better in countless subtle ways. That invisible impact is the true power and responsibility of web development.
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
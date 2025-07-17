import React, { useState } from 'react';
import Dashboard from './component/Dashboard';
import LearningJourney from './component/LearningJourney';
import CourseResult from './component/CourseResult';
import QuizPage from './component/QuizPage';
import BottomNavbar from './component/BottomNavbar';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'learning-journey':
        return <LearningJourney onNavigate={setCurrentPage} />;
      case 'course-result':
        return <CourseResult onNavigate={setCurrentPage} />;
      case 'quiz':
        return <QuizPage onNavigate={setCurrentPage} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <BottomNavbar currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;

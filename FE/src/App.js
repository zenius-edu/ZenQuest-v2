import React, { useState } from 'react';
import Dashboard from './component/Dashboard';
import LearningJourney from './component/LearningJourney';
import CourseResult from './component/CourseResult';
import QuizPage from './component/QuizPage';
import ReadingMaterial from './component/ReadingMaterial';
import ReadingPage from './component/ReadingPage';
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
      case 'reading-material':
        return <ReadingMaterial onNavigate={setCurrentPage} selectedPlan={window.zenverseSelectedPlan} />;
      case 'reading-page':
        return <ReadingPage onNavigate={setCurrentPage} selectedPlan={window.zenverseSelectedPlan} selectedChapter={window.zenverseSelectedChapter} />;
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

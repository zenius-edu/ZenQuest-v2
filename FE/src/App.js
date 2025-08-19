import React, { useEffect, useState } from 'react';
import Dashboard from './component/Dashboard';
import LearningJourney from './component/LearningJourney';
import CourseResult from './component/CourseResult';
import QuizPage from './component/QuizPage';
import ReadingMaterial from './component/ReadingMaterial';
import ReadingPage from './component/ReadingPage';
import RankingPage from './component/RankingPage';
import ProfilePage from './component/ProfilePage';
import LoginPage from './component/LoginPage';
import BottomNavbar from './component/BottomNavbar';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');
  const [navTick, setNavTick] = useState(0);

  // React to auth token changes
  useEffect(() => {
    if (!token) {
      setCurrentPage('login');
    } else if (token && currentPage === 'login') {
      setCurrentPage('dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Listen for forced logout navigation
  useEffect(() => {
    const handler = () => setCurrentPage('login');
    window.addEventListener('zq:navigate-login', handler);
    return () => window.removeEventListener('zq:navigate-login', handler);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    setNavTick((t) => t + 1);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'learning-journey':
        return <LearningJourney onNavigate={navigate} />;
      case 'course-result':
        return <CourseResult onNavigate={navigate} />;
      case 'quiz':
        return <QuizPage onNavigate={navigate} />;
      case 'reading-material':
        return <ReadingMaterial onNavigate={navigate} selectedPlan={window.zenverseSelectedPlan} />;
      case 'reading-page':
        return <ReadingPage onNavigate={navigate} selectedPlan={window.zenverseSelectedPlan} selectedChapter={window.zenverseSelectedChapter} />;
      case 'ranking':
        return <RankingPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} refreshKey={navTick} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      {currentPage !== 'login' && <BottomNavbar currentPage={currentPage} onNavigate={navigate} />}
    </div>
  );
}

export default App;

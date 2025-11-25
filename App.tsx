import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import TemplateSelectionPage from './pages/TemplateSelectionPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'templates' | 'builder'>('login');

  if (currentView === 'login') {
    return <LoginPage onLogin={() => setCurrentView('templates')} />;
  }

  if (currentView === 'templates') {
    return <TemplateSelectionPage onSelect={() => setCurrentView('builder')} onLogout={() => setCurrentView('login')} />;
  }

  return <ResumeBuilderPage onBack={() => setCurrentView('templates')} />;
}

export default App;
import React, { useState } from 'react';
import FamilyTree from './components/FamilyTree';
import ManagementPage from './components/ManagementPage';
import FloatingNav from './components/FloatingNav';
import { FamilyTreeProvider } from './contexts/FamilyTreeContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'tree' | 'management'>('tree');

  return (
    <FamilyTreeProvider>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'tree' ? <FamilyTree /> : <ManagementPage />}
        <FloatingNav
          currentView={currentView}
          onSwitchView={setCurrentView}
        />
        <LanguageSwitcher />
      </div>
    </FamilyTreeProvider>
  );
};

export default App;

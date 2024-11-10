import React, { useState } from 'react';
import FamilyTree from './components/FamilyTree';
import ManagementPage from './components/ManagementPage';
import FloatingNav from './components/FloatingNav';
import { FamilyTreeProvider } from './contexts/FamilyTreeContext';

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
      </div>
    </FamilyTreeProvider>
  );
};

export default App;

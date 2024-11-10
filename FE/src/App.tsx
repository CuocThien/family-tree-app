import React from "react";
import FamilyTree from "./components/FamilyTree";
import { FamilyTreeProvider } from './contexts/FamilyTreeContext';

const App: React.FC = () => {
  return (
    <FamilyTreeProvider>
      <FamilyTree />
    </FamilyTreeProvider>
  );
};

export default App;

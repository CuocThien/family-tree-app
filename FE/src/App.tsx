import React from "react";
import FamilyTree from "./components/FamilyTree";

const App: React.FC = () => {
  return (
    <div className="app-container items-center justify-center bg-gray-100">
      <FamilyTree />
    </div>
  );
};

export default App;

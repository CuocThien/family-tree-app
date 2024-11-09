// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import FamilyTree from "./components/FamilyTree";

const App: React.FC = () => {
  return (
    <div className="app-container items-center justify-center bg-gray-100">
      <FamilyTree />
    </div>
    // <div className=" min-h-screen flex items-center justify-center bg-gray-100">
    //   <header className="app-header text-center p-4">
    //     <h1 className="text-3xl font-bold text-gray-800">Family Tree</h1>
    //   </header>
    //   <main className="app-main w-full max-w-4xl mx-auto p-4">
    //     <FamilyTree />
    //   </main>
    //   <footer className="app-footer text-center mt-8 text-gray-600 text-sm">
    //     <p>&copy; {new Date().getFullYear()} Family Tree App</p>
    //   </footer>
    // </div>

  );
};

export default App;

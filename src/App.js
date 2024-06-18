import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Editor from './Components/Editor';
function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`App ${theme}`}>
    <Header toggleTheme={toggleTheme} theme={theme} />
    <Editor />
  </div>
  );
}

export default App;

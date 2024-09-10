import React, { useState } from 'react';
import './App.css';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import Header from './components/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="hero-section">
        <h1 className="highlight-text">Collaborate. Create. Connect.</h1>
        <h2 className="highlight-text">Showcase your projects to a global community!</h2>
        <button className="cta-button">Get Started</button>
      </div>
      <SignUpModal />
      <LoginModal />
    </div>
  );
}

export default App;
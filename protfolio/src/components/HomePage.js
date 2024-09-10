import React, { useState } from 'react';
import './Header.css';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

function Header({ searchTerm, setSearchTerm }) {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openSignUpModal = (e) => {
    e.preventDefault();
    setIsSignUpOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpOpen(false);
  };

  const openLoginModal = (e) => {
    e.preventDefault();
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <header className="header">
      <h1>ProtFolio</h1>
      <nav>
        <ul className="nav-list">
          <li className="profile-icon">
            <a href="/profile">
              <div className="icon-circle">
                <div className="icon-person"></div>
              </div>
            </a>
          </li>
          <div className="nav-links">
            <li><a href="/">Home</a></li>
            <li>|</li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li>|</li>
            <li><a href="/projects">Projects</a></li>
            <li>|</li>
            <li><a href="/about">About</a></li>
            <li>|</li>
            <li><a href="/signup" onClick={openSignUpModal}>Sign Up</a></li>
            <li>|</li>
            <li><a href="/login" onClick={openLoginModal}>Log In</a></li>
          </div>
          <li className="search-container">
            <input
              type="text"
              placeholder="Search projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
        </ul>
      </nav>
      <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUpModal} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
    </header>
  );
}

export default Header;
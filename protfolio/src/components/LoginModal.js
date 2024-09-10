import React, { useState, useEffect } from 'react';
import './LoginModal.css';

function LoginModal({ isOpen, onClose }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [showTick, setShowTick] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Identifier:', identifier);
    console.log('Password:', password);
    // Show tick animation
    setShowTick(true);
    setTimeout(() => {
      setShowTick(false);
      handleClose();
    }, 2000); // Display tick animation for 2 seconds
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIdentifier('');
      setPassword('');
      setIsClosing(false);
      onClose();
    }, 500); // Match the duration of the closing animation
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOverlayClick);
    } else {
      document.removeEventListener('click', handleOverlayClick);
    }
    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'fade-out' : ''}`} onClick={handleOverlayClick}>
      <div className={`modal-content ${isClosing ? 'slide-down' : ''}`}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email:
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
      {showTick && (
        <div className="tick-overlay">
          <div className="tick-animation">
            <svg viewBox="0 0 52 52">
              <circle className="tick-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="tick-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModal;
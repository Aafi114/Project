import React, { useState, useEffect } from 'react';
import './SignUpModal.css';

function SignUpModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isClosing, setIsClosing] = useState(false);
  const [showTick, setShowTick] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Show tick animation
      setShowTick(true);
      setTimeout(() => {
        setShowTick(false);
        handleClose();
      }, 2000); // Display tick animation for 2 seconds
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setUsername('');
      setEmail('');
      setPassword('');
      setErrors({});
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h3>Username</h3>
            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </label>
          </div>
          <div className="form-group">
            <h3>Email</h3>
            <label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
          </div>
          <div className="form-group">
            <h3>Password</h3>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </label>
          </div>
          <button type="submit">Sign Up</button>
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

export default SignUpModal;
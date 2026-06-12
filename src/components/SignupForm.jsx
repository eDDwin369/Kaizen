import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Lock, Eye, EyeOff, Info, ArrowRight, UserPlus } from 'lucide-react';
import './SignupForm.css';

export default function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // Password requirements checklist
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasMinLength = formData.password.length >= 8;
  const isPasswordValid = hasUppercase && hasNumber && hasMinLength;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Please enter both your first name and last name.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    // Basic email validation regex
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.password) {
      setError('Please create a password.');
      return;
    }
    if (!isPasswordValid) {
      setError('Password does not meet the requirements.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Call state callback on successful validation
    onSignup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    });
  };

  return (
    <div className="signup-wrapper animate-fade-in">
      <div className="signup-card">
        {/* Header Icon */}
        <div className="header-icon-container">
          <div className="outer-circle">
            <div className="inner-circle">
              <UserPlus className="icon-blue" size={32} />
            </div>
          </div>
        </div>

        {/* Header Titles */}
        <div className="signup-header">
          <h2>Create your account</h2>
          <p>Set up your KOJO partner account to start accessing leads</p>
        </div>

        <hr className="divider" />

        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="form-error">{error}</div>}

          {/* First & Last Name row */}
          <div className="form-row-2">
            <div className="form-group">
              <label>
                First Name<span className="asterisk">*</span>
              </label>
              <div className="input-icon-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="James Brown"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Last Name<span className="asterisk">*</span>
              </label>
              <div className="input-icon-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="James Brown"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email field */}
          <div className="form-group">
            <label>
              Email Address<span className="asterisk">*</span>
            </label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="james@gmail.com"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="form-group">
            <label>
              Password<span className="asterisk">*</span>
            </label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Password check text below field */}
            <div className="password-instruction-row">
              <Info className="info-icon" size={14} />
              <span className={`instruction-text ${formData.password && !isPasswordValid ? 'invalid' : ''}`}>
                Must contain 1 uppercase letter, 1 number, min. 8 characters.
              </span>
            </div>
            {formData.password && (
              <div className="password-checklist">
                <span className={hasMinLength ? 'checked' : ''}>Min 8 chars</span>
                <span className={hasUppercase ? 'checked' : ''}>1 Uppercase</span>
                <span className={hasNumber ? 'checked' : ''}>1 Number</span>
              </div>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="form-group">
            <label>
              Confirm Password<span className="asterisk">*</span>
            </label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <hr className="divider form-bottom-divider" />

          {/* Continue button */}
          <button type="submit" className="continue-button">
            Continue <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

SignupForm.propTypes = {
  onSignup: PropTypes.func.isRequired
};

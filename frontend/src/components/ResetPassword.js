import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import ButtonSpinner from './ButtonSpinner';
import { showSuccess, showError } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      if (response.ok) {
        showSuccess(result.message); // Show alert for success message
      } else {
        showError(result.message || 'Failed to send reset link'); // Show alert for error message
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      showError('An error occurred. Please try again.'); // Show alert for catch error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
                <title>Prayatak - Reset Password </title>
            </Helmet>
      <section className="login-center">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <div className="form-group">
              <label htmlFor="email">Enter Your Email</label>
              <input
                className="input-area"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={isLoading} style={{position: 'relative'}}>
              {isLoading ? (
                <>
                  <span>Sending</span>
                  <ButtonSpinner variant="clip" position="inline" size={12} />
                </>
              ) : 'Send Email'}
            </button>
            <p><Link to="/login">Back to Login</Link></p>
          </form>
        </div>
      </section>

    </div>
  );
}

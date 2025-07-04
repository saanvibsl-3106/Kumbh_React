import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import ButtonSpinner from './ButtonSpinner';
import { showSuccess, showError } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/reset-password/${token}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess(data.message); // Notify user of success
        navigate('/login');  // Redirect to login page
      } else {
        showError(data.message); // Notify user of any error messages
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      showError('An error occurred. Please try again.');
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
              <label htmlFor="password">Enter New Password</label>
              <input
                className="input-area"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={isLoading} style={{position: 'relative'}}>
              {isLoading ? (
                <>
                  <span>Updating</span>
                  <ButtonSpinner variant="clip" position="inline" size={12} />
                </>
              ) : 'Update Password'}
            </button>
            <p><Link to="/login">Back to Login</Link></p>
          </form>
        </div>
      </section>

    </div>
  );
}

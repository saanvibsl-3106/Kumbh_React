import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Helmet } from 'react-helmet-async';
import { showSuccess, showError, showWarning, showFieldRequired, showValidationError, showLoading, dismissToast } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  function isValidPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/(?!^\+)[^\d]/g, '');
    const phoneRegex = /^(?:\+(\d{1,3}))?(\d{7,15})$/;
    const match = cleanedPhoneNumber.match(phoneRegex);
  
    if (match) {
      const countryCode = match[1];
      const mainNumber = match[2];
      if (mainNumber.length >= 7 && mainNumber.length <= 15) {
        return true;
      }
    }
    return false;
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Detailed validation with specific error messages
    if (!name.trim()) {
      showFieldRequired('Name');
      return;
    }
    if (name.length < 3) {
      showValidationError('Name', 'Name must be at least 3 characters long');
      return;
    }
    
    if (!email.trim()) {
      showFieldRequired('Email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showValidationError('Email', 'Please enter a valid email address');
      return;
    }
    
    if (!password) {
      showFieldRequired('Password');
      return;
    }
    if (password.length < 6) {
      showValidationError('Password', 'Password must be at least 6 characters long');
      return;
    }
    
    if (!cpassword) {
      showFieldRequired('Confirm Password');
      return;
    }
    if(password != cpassword) {
      showValidationError('Passwords', 'Passwords do not match');
      return;
    }
    
    if (!phoneNumber.trim()) {
      showFieldRequired('Phone Number');
      return;
    }
    if(!isValidPhoneNumber(phoneNumber)) {
      showValidationError('Phone Number', 'Please enter a valid phone number');
      return;
    }
    
    if (!address.trim()) {
      showFieldRequired('Address');
      return;
    }
    
    setLoadingSubmit(true);
    const loadingToast = showLoading('Creating your account...');
    
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phoneNumber, address }),
      });

      const data = await response.json();
      dismissToast(loadingToast);
      
      if (response.ok) {
        showSuccess('Account created successfully! Please check your email for OTP verification.');
        navigate(`/OtpCheck/${data.token}`);
      } else {
        showError(data.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      dismissToast(loadingToast);
      showError('Network error. Please check your connection and try again.');
    }finally{
      setLoadingSubmit(false);
    }
  };

  return (
    <div className='sign-up-body'>
      <Helmet>
                <title>Prayatak - SignUp</title>
            </Helmet>
      <section className="login-center">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="input-area"
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input
                className="input-area"
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                className="input-area"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                className="input-area"
                id="address"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
              <input
                className="input-area"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                  className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-hidden="true"
                ></i>
                </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                className="input-area"
                type="password"
                id="cpassword"
                name="cpassword"
                required
                value={cpassword}
                onChange={(e) => setcPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn"  disabled={loadingSubmit} > {loadingSubmit ? 'Sending Otp...' : 'Send Otp'}</button>
            <p className="text-smaller">
              Already have an account? <Link to="/login">Go to login</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

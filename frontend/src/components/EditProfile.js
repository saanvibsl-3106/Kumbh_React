import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Helmet } from 'react-helmet-async';
import Loading from './Loading';
import ButtonSpinner from './ButtonSpinner';
import { showSuccess, showError, showWarning, showFieldRequired, showValidationError, showLoading, dismissToast } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

export default function EditProfile() {
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if no user is found
    } else {
      // Prefill the input fields with user's current data
      setName(user.name || '');
      setPhoneNumber(user.phoneNumber || '');
      setAddress(user.address || '');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Detailed validation
    if (!name.trim()) {
      showFieldRequired('Name');
      return;
    }
    if (name.length < 3) {
      showValidationError('Name', 'Name must be at least 3 characters long');
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
    if(password !== cpassword) {
      showValidationError('Passwords', 'Passwords do not match');
      return;
    }
    if (!phoneNumber.trim()) {
      showFieldRequired('Phone Number');
      return;
    }
    if (!address.trim()) {
      showFieldRequired('Address');
      return;
    }
    
    setIsLoading(true);
    const loadingToast = showLoading('Updating your profile...');
    
    try {
      const response = await fetch(`${API_URL}/profile/${user._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password , phoneNumber , address }),
      });

      const data = await response.json();
      dismissToast(loadingToast);

      if (response.ok) {
        showSuccess('Profile updated successfully!');
        const updatedUser = { ...user, name , phoneNumber , address };
        setUser(updatedUser);
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        navigate('/profile'); 
      } else {
        showError(data.message || 'Failed to update profile'); 
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      dismissToast(loadingToast);
      showError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
                <title>Prayatak - Edit Profile </title>
            </Helmet>
      <section className="login-center">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Update Profile</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="input-area"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name">Phone Number</label>
              <input
                className="input-area"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <label htmlFor="name">Address</label>
              <input
                className="input-area"
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <div className="password-container">
              <input
                className="input-area"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                  className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-hidden="true"
                ></i>
                </div>
              <label htmlFor="password">Confirm Password</label>
              <input
                className="input-area"
                type="password"
                id="cpassword"
                name="cpassword"
                value={cpassword}
                onChange={(e) => setcPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={isLoading} style={{position: 'relative'}}>
              {isLoading ? (
                <>
                  <span>Updating</span>
                  <ButtonSpinner variant="clip" position="inline" size={12} />
                </>
              ) : 'Update Profile'}
            </button>
            <p><Link to="/login">Back to Login</Link></p>
          </form>
        </div>
      </section>

    </div>
  );
}

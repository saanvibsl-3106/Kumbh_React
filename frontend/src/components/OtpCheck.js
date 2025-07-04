import React, { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Helmet } from 'react-helmet-async';
import Loading from './Loading';
import ButtonSpinner from './ButtonSpinner';
import { showSuccess, showError } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

function OtpCheck() {
    const { token } = useParams(); 
    const navigate = useNavigate();
    const [OTP, setOTP] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, loginUser } = useContext(UserContext);
    
    const verifyOtp = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        try {
          const response = await fetch(`${API_URL}/otp-check/${token}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({OTP}),
          });
    
          const data = await response.json();
          if (response.ok) {
            showSuccess(data.message);
            loginUser(data.user);
            navigate('/');
          } else {
            showError(data.message);
          }
        } catch (error) {
          console.error('Error signing up:', error);
          showError('Signup failed');
        } finally {
          setIsLoading(false);
        }
      };

    const handleOtpChange = (e) => {
        setOTP(e.target.value);
    };

    return (
        <div>
          <Helmet>
                <title>Prayatak - Otp </title>
            </Helmet>
            <section className="login-center">
                <div className="login-container">
                    <form className="login-form" onSubmit={verifyOtp}>
                        <h2>Enter Your OTP</h2>
                        <div className="form-group">
                            <label htmlFor="otp">Enter OTP</label>
                            <input
                                className="input-area"
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Enter OTP"
                                value={OTP}
                                onChange={handleOtpChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn" disabled={isLoading} style={{position: 'relative'}}>
                            {isLoading ? (
                                <>
                                    <span>Verifying</span>
                                    <ButtonSpinner variant="clip" position="inline" size={12} />
                                </>
                            ) : 'Verify OTP'}
                        </button>
                        <p><Link to="/login">Back to Login</Link></p>
                    </form>
                </div>
            </section>

        </div>
    );
}

export default OtpCheck;

import React, { useState, useContext } from 'react';
import '../css/Contact.css';
import companyImage from '../images/company-image.jpeg';
import BlogContext from '../context/BlogContext';
import { Helmet } from 'react-helmet-async';
import ButtonSpinner from './ButtonSpinner';
import { showSuccess, showError, showWarning, showLoading, dismissToast, showFieldRequired, showValidationError } from '../utils/toast';

const ContactForm = () => {
  const { contactform } = useContext(BlogContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, phone, message } = formData;
    
    // Validate form data with specific field messages
    if (!name) {
      showFieldRequired('Name');
      return;
    }
    if (!email) {
      showFieldRequired('Email');
      return;
    }
    if (!phone) {
      showFieldRequired('Phone');
      return;
    }
    if (!message) {
      showFieldRequired('Message');
      return;
    }

    // Validate phone number
    if(!isValidPhoneNumber(phone)) {
      showValidationError('Phone', 'Please enter a valid phone number');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showValidationError('Email', 'Please enter a valid email address');
      return;
    }

    // Validate message length
    if (message.length < 10) {
      showValidationError('Message', 'Message must be at least 10 characters long');
      return;
    }
    
    setIsLoading(true);
    const loadingToast = showLoading('Sending your message...');
    
    try {
      await contactform(name, email, phone, message);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      dismissToast(loadingToast);
      showSuccess('Your message has been sent successfully! We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting form:', error);
      dismissToast(loadingToast);
      showError('An error occurred while sending your message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-main">
      <Helmet>
                <title>Prayatak - Contact Us </title>
            </Helmet>
      <section className="contact-contact-form">
        <div className="contact-container">
          <div className="contact-form-wrapper">
            <div className="contact-company-adress">
              <div className="contact-adress-group">
                <h2 className="contact-head contact-md-heading contact-text-gray">Location</h2>
                <p className="contact-p-li">
                  <i className="fa-solid fa-location-pin"></i> Jhalwa, Prayagraj, Uttar Pradesh
                </p>
              </div>
              <div className="contact-adress-group">
                <h2 className="contact-head contact-md-heading contact-text-gray">Email</h2>
                <p className="contact-p-li">
                  <i className="fa-solid fa-envelope"></i> tpwKumbh2025@gmail.com
                </p>
              </div>
              <div className="contact-adress-group">
                <h2 className="contact-head contact-md-heading contact-text-gray">Call</h2>
                <p className="contact-p-li">
                  <i className="fa-solid fa-phone"></i> +91-987-654-3210
                </p>
              </div>
              <img src={companyImage} alt="company" />
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h1 className="contact-head contact-lg-heading contact-text-black">Contact Us</h1>
              <p className="contact-p-li contact-text-gray">
                Let us know your suggestions and concerns by filling out the form below
              </p>
              <div className="contact-form-group contact-f1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form-group contact-f1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form-group contact-f1">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form-group">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-form-btn" disabled={isLoading} style={{position: 'relative'}}>
                {isLoading ? (
                  <>
                    <span>Submitting</span>
                    <ButtonSpinner variant="pulse" position="inline" size={8} color="#ffffff" />
                  </>
                ) : 'Submit'}
              </button>
              <div className="contact-social-media">
                <h2 className="contact-head">Follow Us</h2>
                <a
                  href="https://facebook.com"
                  className="contact-social-icon contact-facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  className="contact-social-icon contact-twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  className="contact-social-icon contact-instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  className="contact-social-icon contact-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactForm;

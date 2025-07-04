import React, { useState, useContext, useEffect } from 'react';
import LfContext from '../context/LfContext';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import image1 from '../images/image1.jpeg';
import image4 from '../images/image4.jpeg';
import image5 from '../images/image5.jpeg';
import image3 from '../images/image3.jpeg';
import { Helmet } from 'react-helmet-async';
import { showSuccess, showError, showWarning, showInfo, showFieldRequired, showValidationError, showFileUploadSuccess, showFileSizeError, showFileTypeError, showLoading, dismissToast } from '../utils/toast';

export default function Showcaselostandfound() {
  const [bgIndex, setBgIndex] = useState(0);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const backgrounds = [
    image1,
    image5,
    image4,
    image3
  ];
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
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to go to the next background image
  const nextBackground = () => {
    console.log("next");
    setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  // Function to go to the previous background image
  const prevBackground = () => {
    setBgIndex((prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length);
  };
  const { addItems } = useContext(LfContext);
  const { user } = useContext(UserContext);
  const initialItemState = {
    landf: "",
    type: "",
    description: "",
    location: "",
    date: "",
    photo: '',
    contact: "",
  };
  const [item, setItem] = useState(initialItemState);
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    
    // Detailed validation
    if (!item.landf) {
      showFieldRequired('Lost/Found status');
      return;
    }
    if (!item.type) {
      showFieldRequired('Item type');
      return;
    }
    if (!item.description || item.description.trim().length < 10) {
      showValidationError('Description', 'Description must be at least 10 characters long');
      return;
    }
    if (!item.location) {
      showFieldRequired('Location');
      return;
    }
    if (!item.date) {
      showFieldRequired('Date');
      return;
    }
    if (!item.contact) {
      showFieldRequired('Contact number');
      return;
    }
    if(!isValidPhoneNumber(item.contact)) {
      showValidationError('Contact number', 'Please enter a valid phone number');
      return;
    }
    
    setLoadingSubmit(true);
    const loadingToast = showLoading('Submitting your report...');
    
    try {
      addItems(item.landf, item.type, item.description, item.location, item.date, item.photo, item.contact , user.name,user.email);
      dismissToast(loadingToast);
      showSuccess("Report submitted successfully! We'll help you find your item.");
      setItem(initialItemState); // Clear form fields
      setIsActive(false);
    } catch (error) {
      dismissToast(loadingToast);
      showError('Failed to submit report. Please try again.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const onChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          showFileSizeError();
          e.target.value = ''; // Clear the input
          return;
        }
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          showFileTypeError();
          e.target.value = ''; // Clear the input
          return;
        }
        
        setItem({ ...item, [name]: file });
        showFileUploadSuccess();
      }
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const openForm = () => {
    if(!user) {
      showInfo('login to report a lost or found item');
      navigate('/login');
    }
    setIsActive(true);
  };

  const closeForm = () => {
    setIsActive(false);
    setItem(initialItemState); // Clear form fields when closing
  };

  const [filters, setFilters] = useState({
    type: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClicks = (e) => {
    e.preventDefault();
    navigate(`/finder?type=${filters.type}&location=${filters.location}`);
  };

  return (
    <>
    <Helmet>
                <title>Prayatak - Lost and Found </title>
            </Helmet>
      <div className="home" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%), url(${backgrounds[bgIndex]})`,
      }}>
        <div className="content">
          <div className="rotate">
            Follow us
            <i className="fa-brands fa-instagram space5px"></i>
            <i className="fa-brands fa-twitter space5px"></i>
          </div>
          <div className="guide-section">
            <div className="line-text">
              <span className="line"></span>
              <span className="guide-title">Fast and Efficient</span>
              <span className="line"></span>
            </div>
            <h1>Lost and Found Near You !!</h1>

            <div className="form-container">
              <div>
                <label htmlFor="itemType"> <i className="fa-solid fa-circle-chevron-right"></i> Lost What : </label>
                <select id="itemType" name="type" value={filters.type} onChange={handleChange}>
                  <option value="" disabled>Select Item Type</option>
                  <option value="Phones & Tablets">Phones & Tablets</option>
                  <option value="Bags">Bags</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Watches">Watches</option>
                  <option value="People">People</option>
                  <option value="Documents">Documents</option>
                  <option value="Keys">Keys</option>
                  <option value="Toys">Toys</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Fashion Accessories">Fashion Accessories</option>
                  <option value="Clothes & Shoes">Clothes & Shoes</option>
                  <option value="Pets">Pets</option>
                  <option value="Sports Equipment">Sports Equipment</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Other">Other</option>

                </select>

                <label htmlFor="location">
                  <i className="fa-solid fa-circle-chevron-right"></i> Location:
                </label>
                <select id="location" name="location" value={filters.location} onChange={handleChange}>
                <option value="" disabled>Select Location</option>
              <option value="Triveni Sangam">Triveni Sangam</option>
              <option value="Railway Station">Railway Station</option>
              <option value="Airport">Airport</option>
              <option value="Company Museum">Company Museum</option>
              <option value="Civil Lines">Civil Lines</option>
              <option value="Other">Other</option>
                </select>
                <br />
              </div>

              <div className="button-container">
                <button className="btn-primary lost-btn " onClick={handleClicks}>Find</button>
              </div>
              <div className="padding-5">
                <label htmlFor="reportLostFound"> <i className="fa-solid fa-circle-chevron-right"></i> Want to Report a Lost or Found Item? </label>
                <div className="button-container">
                  <button className="btn-primary lost-btn" onClick={openForm}>Report Here</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="notvisible">Scroll Down</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div>
        <div className={`unique-report-form ${isActive ? 'active' : ''}`}>
          <button className="unique-close-button" onClick={closeForm}>&times;</button>

          <h2>Report Issue</h2>
          <form className="unique-form">
            <input
              className="unique-input"
              type="text"
              name="title"
              placeholder="Give title in about 20 words"
              value={item.title || ""}
              onChange={onChange}
              required
            />

            <select className="unique-select" name="landf" value={item.landf} onChange={onChange} required>
              <option value="" disabled>Lost/Found</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>

            <select className="unique-select" name="type" value={item.type} onChange={onChange} required>
              <option value="" disabled>Select Item Type</option>
              <option value="Phones & Tablets">Phones & Tablets</option>
              <option value="Bags">Bags</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Watches">Watches</option>
              <option value="People">People</option>
              <option value="Documents">Documents</option>
              <option value="Keys">Keys</option>
              <option value="Toys">Toys</option>
              <option value="Laptop">Laptop</option>
              <option value="Fashion Accessories">Fashion Accessories</option>
              <option value="Clothes & Shoes">Clothes & Shoes</option>
              <option value="Pets">Pets</option>
              <option value="Sports Equipment">Sports Equipment</option>
              <option value="Automobile">Automobile</option>
              <option value="Other">Other</option>

            </select>

            <textarea
              className="unique-input"
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={onChange}
              required
            ></textarea>

            <select className="unique-select" name="location" value={item.location} onChange={onChange} required>
              <option value="" disabled>Select Location</option>
              <option value="Triveni Sangam">Triveni Sangam</option>
              <option value="Railway Station">Railway Station</option>
              <option value="Airport">Airport</option>
              <option value="Company Museum">Company Museum</option>
              <option value="Civil Lines">Civil Lines</option>
              <option value="Other">Other</option>
            </select>

            <label className="unique-label" htmlFor="date">Date of Submission (dd-mm-yyyy):</label>
            <input
              className="unique-input"
              type="date"
              id="date"
              name="date"
              value={item.date}
              onChange={onChange}
              max={new Date().toISOString().split("T")[0]}
              required
            />


            <input
              className="unique-input"
              type="file"
              name="photo"
              onChange={onChange}
              accept="image/*"
            />
            <input
              className="unique-input"
              type="text"
              name="contact"
              placeholder="+91 XXXXXXXXXX"
              value={item.contact}
              onChange={onChange}
              required
            />

            <button className="btn-primary lost-btn new-btn" type="submit" onClick={handleClick} disabled={loadingSubmit}>
              {loadingSubmit ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
        <button
          className="carousel-button-home left"
          onClick={prevBackground}
          style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '30px', cursor: 'pointer' }}
        >
          &#10094; {/* Left Arrow */}
        </button>

        <button
          className="carousel-button-home right"
          onClick={nextBackground}
          style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '30px', cursor: 'pointer' }}
        >
          &#10095; {/* Right Arrow */}
        </button>
      </div>
    </>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import logo from '../images/logo192.png';
import logoText from '../images/logofinal-removebg-preview.png';

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close the menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" id="navbar">
      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
      </div>

      {/* Logo */}
      <div className="logo">
        <Link className='logoimg' to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Link className='logotxt' to="/">
          <img src={logoText} alt="Logo" />
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
        <li className={`${location.pathname === '/' ? 'activeg' : ''}`}>
          <Link to="/">Home</Link>
        </li>
        <li className={`${location.pathname === '/major-attractions' ? 'activeg' : ''}`}>
          <Link to="/major-attractions">Major Attractions</Link>
        </li>
        <li className={`${location.pathname === '/blogs/1' ? 'activeg' : ''}`}>
          <Link to="/blogs/1">Blogs</Link>
        </li>
        <li className={`${location.pathname === '/lost-found' ? 'activeg' : ''}`}>
          <Link to="/lost-found">Lost And Found</Link>
        </li>
        <li className={`${location.pathname === '/prayag' ? 'activeg' : ''}`}>
          <Link to="/prayag">About Prayagraj</Link>
        </li>
      </ul>

      {/* Sign-up/Profile Section */}
      <div className="sign-up">
        {user?.isAdmin && (
          <div>
            <i className="fa-solid fa-user-tie"></i>
            <Link to="/admin">{"Admin page  "}</Link>
          </div>
        )}
        <i className="fa-solid fa-user" style={{ marginLeft: '20px' }}></i>
        {user ? (
          <Link to="/profile">{user.name}</Link>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>

    </nav>
  );
}

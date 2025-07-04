import React, { useState, useEffect } from 'react';
import image1 from '../images/image1.jpeg';
import image4 from '../images/image4.jpeg';
import image5 from '../images/image5.jpeg';
import image3 from '../images/image3.jpeg';
import image6 from '../images/image6.jpeg';
import { Helmet, HelmetData } from 'react-helmet-async';
export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  const backgrounds = [
    image1,
    image5,
    image4,
    image6,
    image3
  ];

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

  return (
    <>
    <Helmet>
                <title>Prayatak - Home </title>
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
              <span className="guide-title">A Kumbh Mela Guide</span>
              <span className="line"></span>
            </div>
            <h1>Be Prepared for the <br />Biggest Festival Ever !!!</h1>
            <h5>
              <a href="#fades">Scroll Down </a>
              <i className="fa-solid fa-arrow-down-long"></i>
            </h5>
          </div>
          <div>
            <p className="notvisible">Scroll Down</p>
          </div>
        </div>

        {/* Left and Right Buttons */}
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


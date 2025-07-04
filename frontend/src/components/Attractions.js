import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import attractionsData from '../bolgData/attractionsData'; 
import peopleData from '../bolgData/peopleData'; 
import { Helmet } from 'react-helmet-async';

const Attractions = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  // State for holding the attraction data
  const [data, setData] = useState(attractionsData);
  const [selectedAttraction, setSelectedAttraction] = useState('');

  // Effect to update the data based on the path
  useEffect(() => {
    if (path === 'prayag') {
      setData(peopleData);
    } else {
      setData(attractionsData);
    }
  }, [path]);

  // Effect to select the first attraction when data changes
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSelectedAttraction(Object.keys(data)[0]);  // Set first item as selected
    }
  }, [data]);

  return (
    
    <div className="attractions-container">
      
      <h2 className="attractions-title">{path==='prayag'?"Famous Personalities of Prayagraj":"Attractions of Maha Kumbh 2025"}</h2>
      <div className="attractions-content">
        <div className="attractions-sidebar">
          <ul>
            {Object.keys(data).map((attraction) => (
              <li
                key={attraction}
                className={selectedAttraction === attraction ? 'attractions-sidebar-li-active' : 'attractions-sidebar-li'}
                onClick={() => setSelectedAttraction(attraction)}
              >
                {attraction}
              </li>
            ))}
          </ul>
        </div>
        <div className="attractions-main">
          <img
            src={data[selectedAttraction]?.image}
            alt={data[selectedAttraction]?.title}
            className="attractions-image"
          />
          <div className="attractions-description">
            <h3>{data[selectedAttraction]?.title}</h3>
            <p>{data[selectedAttraction]?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attractions;

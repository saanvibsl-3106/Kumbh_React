import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LfContext from '../context/LfContext';
import UserContext from '../context/UserContext';
import { Helmet } from 'react-helmet-async';
import { showInfo } from '../utils/toast';


export default function Finder() {
  const { items, getItems, getItemsBySearch } = useContext(LfContext);
  const { user } = useContext(UserContext);
  const locations = useLocation();
  const queryParams = new URLSearchParams(locations.search);

  // Extract specific query parameters
  const types = queryParams.get("type");
  const navigate = useNavigate();
  const locationParam = queryParams.get("location");

  // Set initial filters based on URL query parameters
  const [filters, setFilters] = useState({
    landf: '',
    location: locationParam || '',
    type: types || ''
  });

  // State to hold the filters only after submit is pressed
  const [submittedFilters, setSubmittedFilters] = useState(filters);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters({
      ...filters,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedFilters(filters);  // Update submittedFilters with current filter values
  };

  const viewItemDetails = (itemId) => {
    if (!user) {
      showInfo("To View Details, You need to Login!");
      navigate('/login');
    } else {
      navigate(`/claimItem/${itemId}`);
    }
  };

  useEffect(() => {
    // Fetch items based on submittedFilters only when they change
    if (submittedFilters.location || submittedFilters.type || submittedFilters.landf) {
      getItemsBySearch(submittedFilters);
    } else {
      getItems();
    }
  }, [submittedFilters, getItems, getItemsBySearch]);
  

  return (
    <div>
      <Helmet>
                <title>Prayatak - Items </title>
            </Helmet>
      <div className="finder-container">
        <div className="finder-main-content">
          <aside className="finder-sidebar">
            <h2>Search Filters</h2>
            <form onSubmit={handleSubmit}>
              <div className="finder-filter-group">
                <label htmlFor="landf">Lost/Found</label>
                <select id="landf" value={filters.landf} onChange={handleChange}>
                  <option value="">Lost/Found</option>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
              <div className="finder-filter-group">
                <label htmlFor="location">Location</label>
                <select id="location" value={filters.location} onChange={handleChange}>
                  <option value="" >Select Location</option>
                  <option value="Triveni Sangam">Triveni Sangam</option>
                  <option value="Railway Station">Railway Station</option>
                  <option value="Airport">Airport</option>
                  <option value="Company Museum">Company Museum</option>
                  <option value="Civil Lines">Civil Lines</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="finder-filter-group">
                <label htmlFor="type">Item Type</label>
                <select id="type" value={filters.type} onChange={handleChange}>

                  <option value="" >Select Item Type</option>
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
              </div>
              <button type="submit" className="searching-btn btn-primary-finder lost-btn-finder">
                Search
              </button>
            </form>
          </aside>
          <section className="finder-content">
            <h2>Lost and Found Items</h2>
            <div className="finder-item-grid">
              {items.map((item, index) => (
                <div key={index} className="finder-item-card">
                  <img src={item.photo} alt={item.type || "Item"} />
                  <h3>{item.type || "Unknown Type"}</h3>
                  <p>Location: {item.location || "Unknown Location"}</p>
                  <p>Status: {item.landf || "Unknown Status"}</p>
                  <button type="button" className="btn-primary-finder lost-btn-finder" onClick={() => viewItemDetails(item._id)}>
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

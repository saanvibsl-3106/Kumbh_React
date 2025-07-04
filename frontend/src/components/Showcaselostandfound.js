import React from 'react';
import { Link } from 'react-router-dom'; 
export default function Showcaselostandfound() {




  return (
    <div>
      <section className="showcase">
        <div className="container2">
          <div className="region">
            <h2>
              <i className="fa-solid fa-location-dot"></i> Select a region
            </h2>
            <div className="listing">
              <div className="row-wize">
                <Link to="/finder?type=&location=railway" className="region-item btn-primary1">
                  <i className="fa-solid fa-train fa-icon"></i> Railway station
                </Link>
                <Link to="/finder?type=&location=sangam" className="region-item btn-primary1">
                  <i className="fa-solid fa-bridge-water fa-icon"></i> Triveni Sangam
                </Link>
              </div>
              <div className="row-wize">
                <Link to="/finder?type=&location=company" className="region-item btn-primary1">
                  <i className="fa-solid fa-building-columns fa-icon"></i> Company Museum
                </Link>
                <Link to="/finder?type=&location=airport" className="region-item btn-primary1">
                <i className="fa-solid fa-plane-up fa-icon"></i> Airport
                </Link>
              </div>
              <div className="row-wize">
                <Link to="/finder?type=&location=civil" className="region-item btn-primary1">
                  <i className="fa-solid fa-city fa-icon"></i> Civil Lines
                </Link>
                <Link to="/finder?type=&location=other" className="region-item btn-primary1">
                <i className="fas fa-map-marker-alt fa-icon"></i> Other
                </Link>
              </div>
            </div>
          </div>
          <div className="category-container">
            <div className="head">
              <h2>
                Browse by <span>Category</span>
              </h2>
              <div className="head-item">
                <Link to="/finder">
                  <i className="fa-solid fa-bars"></i> View more
                </Link>
              </div>
            </div>
            <table className="category-table">
              <tbody>
                <tr>
                  <td>
                    <Link to="/finder?type=Phones%20&%20tablets&location=" className="category-item">
                      <i className="fas fa-mobile-alt"></i>
                      <p>Phones & Tablets</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Bags&location=" className="category-item">
                      <i className="fas fa-shopping-bag"></i>
                      <p>Bags </p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Jewellery&location=" className="category-item">
                      <i className="fas fa-gem"></i>
                      <p>Jewellery</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Watches&location=" className="category-item">
                      <i className="fas fa-stopwatch"></i>
                      <p>Watches</p>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/finder?type=People&location=" className="category-item">
                      <i className="fas fa-user"></i>
                      <p>People</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Documents&location=" className="category-item">
                      <i className="fas fa-file-alt"></i>
                      <p>Documents</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Keys&location=" className="category-item">
                      <i className="fas fa-key"></i>
                      <p>Keys</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Toys&location=" className="category-item">
                      <i className="fas fa-horse"></i>
                      <p>Toys</p>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/finder?type=Laptop&location=" className="category-item">
                      <i className="fas fa-laptop"></i>
                      <p>Laptop</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Fashion&location=" className="category-item">
                      <i className="fas fa-glasses"></i>
                      <p>Fashion Accessories</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Clothes&location=" className="category-item">
                      <i className="fas fa-tshirt"></i>
                      <p>Clothes & Shoes</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Pets&location=" className="category-item">
                      <i className="fas fa-dog"></i>
                      <p>Pets</p>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/finder?type=Sports&location=" className="category-item">
                      <i className="fas fa-football-ball"></i>
                      <p>Sports Equipment</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Automobile&location=" className="category-item">
                      <i className="fas fa-car"></i>
                      <p>Automobile</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder?type=Other&location=" className="category-item">
                      <i className="fas fa-folder"></i>
                      <p>Other</p>
                    </Link>
                  </td>
                  <td>
                    <Link to="/finder" className="category-item">
                      <i className="fas fa-ellipsis-h"></i>
                      <p>View More</p>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

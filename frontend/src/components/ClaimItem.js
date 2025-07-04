import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LfContext from '../context/LfContext';
import UserContext from '../context/UserContext';
import Loading from './Loading';
import { Helmet } from 'react-helmet-async';
import { showSuccess, showError, showWarning, showDeleteConfirm, showLoading, dismissToast } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

function ClaimItem() {
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
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');

    const { id } = useParams();
    const { getItemById, addClaim } = useContext(LfContext);
    const { user } = useContext(UserContext);
    const [item, setItem] = useState(null);

    const handleDeleteItem = async (itemId) => {
        showDeleteConfirm(
            item?.name || "this item",
            async () => {
                const loadingToast = showLoading('Deleting item...');
                try {
                    const response = await fetch(`${API_URL}/lf/found-item/${itemId}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete item');
                    }

                    dismissToast(loadingToast);
                    showSuccess("Item deleted successfully");
                    navigate('/finder');
                } catch (error) {
                    console.error('Error deleting item:', error);
                    dismissToast(loadingToast);
                    showError('Failed to delete item. Please try again later.');
                }
            },
            () => {
                showWarning('Item deletion cancelled');
            }
        );
    };

    useEffect(() => {
        getItemById(id).then(setItem);
    }, [id, getItemById]);

    if (!item) return <Loading/>

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidPhoneNumber) {
        addClaim(id, description, phone, user.email);
        }
        else{
            showWarning('invalid phone number');
        }

    };

    const formattedDate = item.date
        ? new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Unknown Date';

    return (
        <section className="claim-section">
            <Helmet>
                <title>Prayatak - Claim Item </title>
            </Helmet>
            <div className="claim-container">
                <div className="claim-main-content">
                    <h1 className="claim-item-title">
                        {item.type + " "}
                        <span className={item.landf === "lost" ? "red-status" : "green-status"}>
                            {item.landf}
                        </span>
                    </h1>
                    <div className="claim-item-meta">
                        <span>{formattedDate}</span> •
                        <span>{item.location}</span>
                    </div>

                    <img src={item.photo} alt="Placeholder" className="claim-item-image" />

                    <div className="claim-listing-details">
                        <h3>Details</h3>
                        <div className="claim-detail-row">
                            <div className="claim-detail-label">Location:</div>
                            <div className='claim-detail-text'>{item.location}</div>
                        </div>
                        <div className="claim-detail-row">
                            <div className="claim-detail-label">Description:</div>
                            <div className='claim-detail-text'>
                                {item.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="claim-sidebar">
                    <div className="claim-user-info">
                        <div className="claim-user-name">{item.name}</div>
                        <div>{item.email}</div>
                        {user.isAdmin && <div>{item.contact}</div>}
                    </div>

                    {!user.isAdmin && (
                        <>
                            <button className="claim-contact-button" onClick={() => navigate('/contact')}>
                                Contact us
                            </button>

                            <a
                                href="https://wa.me/919464910100"
                                target="_blank"
                                rel="noopener noreferrer"
                                role="button"
                            >
                                <button className="claim-message-button">Message us on WhatsApp</button>
                            </a>

                            <form id="claim-form" onSubmit={handleSubmit}>
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder={`Give a description of the item you ${item.landf === "lost" ? "Found" : "Claim"}`}
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="+91XXXXXXXXXX"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <button type="submit" className="claim-submit-button">
                                    {item.landf === "lost" ? "Found" : "Submit Claim"}
                                </button>
                            </form>
                        </>
                    )}
                    {user.isAdmin && (
                        <button
                            className="claim-contact-button"
                            onClick={() => handleDeleteItem(id)}
                        >
                            Delete Item
                        </button>
                    )}

                </div>
            </div>
        </section>
    );
}

export default ClaimItem;

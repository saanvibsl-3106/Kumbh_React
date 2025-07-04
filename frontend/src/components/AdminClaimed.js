import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { showSuccess, showError } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

function AdminClaimed() {
    const navigate = useNavigate();
    const [claimedItems, setClaimedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaimedItems = async () => {
            try {
                const response = await fetch(`${API_URL}/lf/admin-claim-requests`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setClaimedItems(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching claimed items:', err);
                setError('Failed to load items. Please try again later.');
                setLoading(false);
            }
        };

        fetchClaimedItems();
    }, []);

    const handleDeleteItem = async (itemId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Item?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${API_URL}/lf/found-item/${itemId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }

                const result = await response.json();
                showSuccess(result.message);
                setClaimedItems((prevItems) =>
                    prevItems.filter(
                        (item) => item.foundandlostItem[0]?._id !== itemId
                    )
                );
            } catch (error) {
                console.error('Error deleting item:', error);
                showError('Failed to delete item. Please try again later.');
            }
        }
        else {
            showError('deletion failed');
        }
    };

    const handleDeleteClaim = async (claimId, itemId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Claim?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${API_URL}/lf/claim-item/${claimId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete claim');
                }

                const result = await response.json();
                showSuccess(result.message);

                setClaimedItems((prevItems) =>
                    prevItems.map((item) => {
                        if (item.claim?._id === claimId) {
                            return { ...item, claim: null };
                        }
                        return item;
                    })
                );
                window.location.reload();
            } catch (error) {
                console.error('Error deleting claim:', error);
                showError('Failed to delete claim. Please try again later.');
            }
        }
        else {
            showError('deletion failed');
        }
    };

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='admin-claimed-body'>
            <div className="admin-claimed-sidebar">
                <button className="admin-sidebar-button" onClick={ ()=>{navigate('/admin')}}>Users</button>
                <button className="admin-sidebar-button" onClick={()=>{navigate('/finder')}}>Lost/Found Items</button>
                <button className="admin-sidebar-button active">Claimed Items</button>
                <button className="admin-sidebar-button" onClick={()=>{navigate('/admin-feedback')}}>Feedbacks</button>
            </div>

            <div className="admin-claimed-main-content">
                <h1 className="admin-claimed-main-title">Claimed Items</h1>
                <div className="admin-claimed-items-container">
                    {claimedItems.map((item, index) => (
                        <div key={index} className="admin-claimed-item-card">
                            <div className="admin-claimed-item-image">
                                <img
                                    src={item.foundandlostItem[0]?.photo || 'placeholder.jpg'}
                                    alt={item.foundandlostItem[0]?.description || 'No description'}
                                />
                            </div>
                            <div className="admin-claimed-item-info">
                                <h2 className="admin-claimed-item-title">Reporter Description:</h2>
                                <p className="admin-claimed-item-description">
                                    {item.foundandlostItem[0]?.description || 'No description provided'}
                                </p>
                                <h3 className="admin-claimed-contact-label">Reporter Contact:</h3>
                                <p className="admin-claimed-contact-number">
                                    {item.foundandlostItem[0]?.contact || 'No contact provided'}
                                </p>
                                <h2 className="admin-claimed-item-title">Claimer Description:</h2>
                                <p className="admin-claimed-item-description">
                                    {item.claim?.description || 'No description provided'}
                                </p>
                                <h3 className="admin-claimed-contact-label">Claimer Contact:</h3>
                                <p className="admin-claimed-contact-number">
                                    {item.claim?.phone || 'No contact provided'}
                                </p>
                            </div>
                            <div className="admin-claimed-item-actions">
                                <button
                                    className="admin-claimed-delete-button"
                                    onClick={() => handleDeleteItem(item.foundandlostItem[0]?._id)}
                                    aria-label="Delete item"
                                >
                                    Delete Item
                                </button>
                                <button
                                    className="admin-claimed-delete-button"
                                    onClick={() => handleDeleteClaim(item.claim?._id, item.foundandlostItem[0]?._id)}
                                    aria-label="Delete claim"
                                >
                                    Delete Claim
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminClaimed;

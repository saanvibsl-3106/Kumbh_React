import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showInfo } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

function UserFeedback() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);

    const handleDelete = async (feedbackId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
        if (confirmDelete) {
            try {
                const url = `${API_URL}/contactus/${feedbackId}`; 
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    setFeedbacks((prevFeedbacks) =>
                        prevFeedbacks.filter((feedback) => feedback._id !== feedbackId)
                    );
                    showSuccess('feedback deleted successfully');
                } else {
                    const error = await response.json();
                    console.error('Error deleting feedback:', error.error);
                }
            } catch (error) {
                console.error('Error deleting feedback:', error);
            }
        } else {
            showInfo('Deletion canceled');
        }
    };

    const getFeedback = async () => {
        try {
            const url = `${API_URL}/contactus`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const json = await response.json();
                setFeedbacks(json);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getFeedback();
    }, []);

    return (
        <><Helmet>
        <title>Prayatak - Feedback</title>
    </Helmet>
        <div className="admin-body">
            <div className="admin-sidebar">
                <button className="admin-sidebar-button" onClick={()=>{navigate('/admin')}}>Users</button>
                <button className="admin-sidebar-button" onClick={()=>{navigate('/finder')}}>Lost/Found Items</button>
                <button className="admin-sidebar-button" onClick={()=>{navigate('/admin-claimed')}}>Claimed Items</button>
                <button className="admin-sidebar-button active"  onClick={()=>{navigate('/admin-feedback')}}>Feedbacks</button>
                    
                
            </div>
            
        <div className="comments-body">
            
            
            <div className="comments-page">
                <h1 className="page-title">User Feedback History</h1>
                <p className="page-subtitle">See your feedback about our adventures!</p>

                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div key={feedback._id} className="comment-item">
                            <div className="comment-details">
                                <h2 className="blog-heading">{feedback.name}</h2>
                                <p className="user-comment">{feedback.message}</p>
                                <p className="user-details-contact">{feedback.email}{" | "}{feedback.phoneNumber}</p>
                            </div>
                            <div className="comment-actions">
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(feedback._id)} // Pass feedback ID
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>No feedback to display.</p>
                )}
            </div>
        </div>
        </div>
        </>
    );
}

export default UserFeedback;


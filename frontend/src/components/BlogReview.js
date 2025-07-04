import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Loading from './Loading';
import ButtonSpinner from './ButtonSpinner';
import { showSuccess, showError } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

export default function BlogReview() {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(UserContext);

  // Fetch reviews on component load
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/blog/${id}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setReviews(data.comments); 
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);  
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(moveNext, 5000);
    return () => clearInterval(interval); // Clean up on unmount
  }, [currentIndex, reviews.length]);

  // Carousel logic for moving to the next item
  const moveNext = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }
  };

  const movePrev = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    }
  };

  // Handle review input change
  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  // Truncate text for display
  const truncateText = (text, length = 100) => {
    return text && text.length > length ? text.slice(0, length) + '...' : text;
  };

  // Modal open and close handlers
  const openModal = (comment) => {
    setSelectedReview(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // Submit a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${API_URL}/blog/${id}/comment`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment: newReview }),
        });

        if (response.ok) {
          const result = await response.json();
          setReviews([...reviews, result.comment]); // Add the new comment to the list
          setNewReview('');
          showSuccess('Comment submitted successfully');
        } else {
          showError('Failed to post comment');
        }
      } catch (error) {
        showError('Error: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <section className="review">
            <div className="carousel-container">
              <h2 className="carousel-title">What Others Think</h2>
              {reviews.length === 0 ? (
                <p style={{ color: 'goldenrod' }}>No reviews available yet.</p>

              ) : (
                <div className="carousel" id="testimonialCarousel">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${currentIndex === index ? 'active' : ''} ${
                        currentIndex === (index - 1 + reviews.length) % reviews.length ? 'left' : ''
                      } ${currentIndex === (index + 1) % reviews.length ? 'right' : ''}`}
                      onClick={() => openModal(review)}
                    >
                      <div className="testimonial">
                        <i className="quote-icon fas fa-quote-left"></i>
                        <p>{truncateText(review.body)}</p>
                        {review.username && <h4>{review.username}</h4>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button className="prev" onClick={movePrev} aria-label="Previous Review">
                &#10094;
              </button>
              <button className="next" onClick={moveNext} aria-label="Next Review">
                &#10095;
              </button>
            </div>
          </section>
          <section className="write-review container">
            <h2 className="carousel-title">Rate Your Experience</h2>
            <form onSubmit={handleSubmit}>
              <div className="review-textarea">
                <label htmlFor="reviewInput" className="sr-only">Share your review</label>
                <textarea
                  className="input-area"
                  id="reviewInput"
                  name="review"
                  placeholder="Share your reviews"
                  rows="5"
                  value={newReview}
                  onChange={handleReviewChange}
                  required
                ></textarea>
                <button type="submit" className="btn-primary lost-btn toCenter" disabled={isSubmitting} style={{position: 'relative'}}>
                  {isSubmitting ? (
                    <>
                      <span>Submitting...</span>
                      <ButtonSpinner variant="clip" position="inline" size={12} color="#fff" />
                    </>
                  ) : 'Submit Review'}
                </button>
              </div>
            </form>

          </section>
          {isModalOpen && selectedReview && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-heading-div">
                  <h3 className="review-modal-heading">By {selectedReview?.username}</h3>
                  <button className="modal-close-button" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <p className="modal-text">{selectedReview?.body}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

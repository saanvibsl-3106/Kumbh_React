import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import LfContext from '../context/LfContext';
import { Helmet } from 'react-helmet-async';
import { showInfo } from '../utils/toast';

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { comments, getComments, addComment } = useContext(LfContext);
  const navigate = useNavigate();

  useEffect(() => {
    getComments(); // Fetch comments on component mount
  }, []);

  useEffect(() => {
    if (comments.length === 0) return; // Don't set interval if there are no comments

    const interval = setInterval(moveNext, 5000); // Change to the next item every 5 seconds
    return () => clearInterval(interval); // Clear interval on unmount or comments change
  }, [comments]); // Add comments to dependency array

  const moveNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
  };

  const movePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + comments.length) % comments.length);
  };

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      showInfo("Please login to submit a review");
      navigate('/login');
    } else {
      addComment(user.name, newReview);
      setNewReview("");
      getComments(); // Refresh comments after adding a new one
    }
  };

  const truncateText = (text, length = 100) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  const openModal = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  return (
    <div>
      <section className="review">
        <div className="carousel-container">
          <h2 className="carousel-title">Success Stories</h2>
          <div className="carousel" id="testimonialCarousel">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className={`carousel-item ${currentIndex === index ? 'active' : ''} ${
                    currentIndex === (index - 1 + comments.length) % comments.length ? 'left' : ''
                  } ${
                    currentIndex === (index + 1) % comments.length ? 'right' : ''
                  }`}
                  onClick={() => openModal(comment)} // Open modal on click
                >
                  <div className="testimonial">
                    <i className="quote-icon fas fa-quote-left"></i>
                    <p>{truncateText(comment.commentText)}</p>
                    <h4>{comment.username}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'goldenrod' }}>No reviews available yet.</p>
            )}
          </div>
          <button className="prev" onClick={movePrev} aria-label="Previous Review">
            &#10094;
          </button>
          <button className="next" onClick={moveNext} aria-label="Next Review">
            &#10095;
          </button>
        </div>
      </section>
      <section className="write-review container">
        <h2 className="carousel-title">Rate Your Own Experience</h2>
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
            <button type="submit" className="btn-primary lost-btn toCenter">Submit Review</button>
          </div>
          <div className="to-center">
            
          </div>
        </form>
      </section>

      {/* Modal for displaying full comment */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
          <div className="modal-heading-div">
            <h3 className='review-modal-heading'>By {selectedComment?.username}</h3>
            <button className="modal-close-button" onClick={closeModal}>&times;</button>
          </div>
            <p className='modal-text'>{selectedComment?.commentText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

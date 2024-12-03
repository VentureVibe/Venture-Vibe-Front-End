import React, { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import "./Reviews.scss";

const Reviews = ({ guide, onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    tourDuration: "1 day",
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      user: "Anonymous User",
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      comment: newReview.comment,
      tourDuration: newReview.tourDuration,
    };
    onAddReview(review);
    setNewReview({ rating: 5, comment: "", tourDuration: "1 day" });
    setShowReviewForm(false);
  };

  const ReviewForm = () => (
    <div className="review-form-overlay">
      <form onSubmit={handleSubmitReview} className="review-form card">
        <h3>Write a Review</h3>
        <div className="form-group">
          <label>Rating</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({ ...newReview, rating: star })}
              >
                {star <= newReview.rating ? <Star /> : <StarBorder />}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Tour Duration</label>
          <select
            value={newReview.tourDuration}
            onChange={(e) =>
              setNewReview({ ...newReview, tourDuration: e.target.value })
            }
          >
            <option value="1 day">1 day</option>
            <option value="2 days">2 days</option>
            <option value="3 days">3 days</option>
            <option value="4+ days">4+ days</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            required
            rows={4}
            placeholder="Share your experience..."
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => setShowReviewForm(false)}>
            Cancel
          </button>
          <button type="submit" className="submit-review">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="reviews-container">
      <div className="reviews">
        <div className="reviews-header">
          <h2>Reviews</h2>
          <button
            className="write-review"
            onClick={() => setShowReviewForm(true)}
          >
            Write Review
          </button>
        </div>

        <div className="reviews-list card">
          {guide.reviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-header">
                <div>
                  <h3>{review.user}</h3>
                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) =>
                        i < review.rating ? (
                          <Star key={i} className="star filled" />
                        ) : (
                          <StarBorder key={i} className="star" />
                        )
                      )}
                    </div>
                    <span className="duration">{review.tourDuration}</span>
                  </div>
                </div>
                <span className="date">{review.date}</span>
              </div>
              <p className="comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      {showReviewForm && <ReviewForm />}
    </div>
  );
};

export default Reviews;

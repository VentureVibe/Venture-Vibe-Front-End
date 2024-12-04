// import React, { useState } from "react";
// import { Star, StarBorder } from "@mui/icons-material";
// import "./Reviews.scss";

// const Reviews = ({ guide, onAddReview }) => {
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [newReview, setNewReview] = useState({
//     rating: 5,
//     comment: "",
//     tourDuration: "1 day",
//   });

//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     const review = {
//       id: Date.now(),
//       user: "Anonymous User",
//       rating: newReview.rating,
//       date: new Date().toISOString().split("T")[0],
//       comment: newReview.comment,
//       tourDuration: newReview.tourDuration,
//     };
//     onAddReview(review);
//     setNewReview({ rating: 5, comment: "", tourDuration: "1 day" });
//     setShowReviewForm(false);
//   };

//   const ReviewForm = () => (
//     <div className="review-form-overlay">
//       <form onSubmit={handleSubmitReview} className="review-form card">
//         <h3>Write a Review</h3>
//         <div className="form-group">
//           <label>Rating</label>
//           <div className="rating-input">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 type="button"
//                 onClick={() => setNewReview({ ...newReview, rating: star })}
//               >
//                 {star <= newReview.rating ? <Star /> : <StarBorder />}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="form-group">
//           <label>Tour Duration</label>
//           <select
//             value={newReview.tourDuration}
//             onChange={(e) =>
//               setNewReview({ ...newReview, tourDuration: e.target.value })
//             }
//           >
//             <option value="1 day">1 day</option>
//             <option value="2 days">2 days</option>
//             <option value="3 days">3 days</option>
//             <option value="4+ days">4+ days</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Comment</label>
//           <textarea
//             value={newReview.comment}
//             onChange={(e) =>
//               setNewReview({ ...newReview, comment: e.target.value })
//             }
//             required
//             rows={4}
//             placeholder="Share your experience..."
//           />
//         </div>
//         <div className="form-actions">
//           <button type="button" onClick={() => setShowReviewForm(false)}>
//             Cancel
//           </button>
//           <button type="submit" className="submit-review">
//             Submit Review
//           </button>
//         </div>
//       </form>
//     </div>
//   );

//   return (
//     <div className="reviews-container">
//       <div className="reviews">
//         <div className="reviews-header">
//           <h2>Reviews</h2>
//           <button
//             className="write-review"
//             onClick={() => setShowReviewForm(true)}
//           >
//             Write Review
//           </button>
//         </div>

//         <div className="reviews-list card">
//           {guide.reviews.map((review) => (
//             <div key={review.id} className="review">
//               <div className="review-header">
//                 <div>
//                   <h3>{review.user}</h3>
//                   <div className="rating">
//                     <div className="stars">
//                       {[...Array(5)].map((_, i) =>
//                         i < review.rating ? (
//                           <Star key={i} className="star filled" />
//                         ) : (
//                           <StarBorder key={i} className="star" />
//                         )
//                       )}
//                     </div>
//                     <span className="duration">{review.tourDuration}</span>
//                   </div>
//                 </div>
//                 <span className="date">{review.date}</span>
//               </div>
//               <p className="comment">{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       {showReviewForm && <ReviewForm />}
//     </div>
//   );
// };

// export default Reviews;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, StarBorder } from "@mui/icons-material";
import "./Reviews.scss";
import { GetUser } from "../../services/user/GetUser";

const ReviewForm = ({
  newReview,
  setNewReview,
  handleSubmitReview,
  setShowReviewForm,
}) => (
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

const Reviews = ({ guide, onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    tourDuration: "1 day",
  });
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/review/receiver/${guide.id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [guide.id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await GetUser();
      setUserDetails(user);
      console.log("my user", user);
    };
    fetchUserDetails();
  }, []); // Empty dependency array ensures this runs only once

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const review = {
      sender: `${userDetails.firstName} ${userDetails.lastName}`,
      receiver: guide.id, // Assuming guide has a name property
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      comment: newReview.comment,
      tourDuration: newReview.tourDuration,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/review/save",
        review
      );
      onAddReview(response.data);
      setNewReview({ rating: 5, comment: "", tourDuration: "1 day" });
      setShowReviewForm(false);
      setReviews([...reviews, response.data]); // Update the reviews state
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

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
          {reviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-header">
                <div>
                  <h3>{review.sender}</h3>
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
      {showReviewForm && (
        <ReviewForm
          newReview={newReview}
          setNewReview={setNewReview}
          handleSubmitReview={handleSubmitReview}
          setShowReviewForm={setShowReviewForm}
        />
      )}
    </div>
  );
};

export default Reviews;

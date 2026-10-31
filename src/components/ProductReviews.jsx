
import { useState } from "react";
import "./ProductReviews.css";

function ProductReviews({ productName }) {
  const storageKey = `reviews-${productName}`;

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  });

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const submitReview = (e) => {
    e.preventDefault();

    const text = reviewText.trim();

    if (!text) {
      alert("Please enter your review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      text,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    localStorage.setItem(storageKey, JSON.stringify(updatedReviews));
    setRating(5);
    setReviewText("");
  };

  return (
    <section className="product-reviews">
      <h2>Ratings & Reviews</h2>

      <div className="reviews-summary">
        <strong>{averageRating} / 5</strong>
        <span className="reviews-stars">
          {"★".repeat(Math.round(Number(averageRating)))}
          {"☆".repeat(5 - Math.round(Number(averageRating)))}
        </span>
        <p>{reviews.length} review(s)</p>
      </div>

      <form className="review-form" onSubmit={submitReview}>
        <label>Rate this product</label>

        <div className="rating-picker" aria-label="Choose a rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={star <= rating ? "star active" : "star"}
              onClick={() => setRating(star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>

        <label htmlFor={`review-text-${productName}`}>
          Write your review
        </label>

        <textarea
          id={`review-text-${productName}`}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          maxLength={500}
          required
        />

        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((review) => (
            <article className="review-item" key={review.id}>
              <div className="review-item-top">
                <span className="reviews-stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
                <small>{review.date}</small>
              </div>

              <p>{review.text}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default ProductReviews;

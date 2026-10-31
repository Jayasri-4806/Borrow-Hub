
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CampingTent.css";

function CampingTentDetails() {
  const navigate = useNavigate();

  const [rentalDays, setRentalDays] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // Review states
  const [rating, setRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("campingTentReviews")) || [];
    } catch {
      return [];
    }
  });

  const accessories = [
    { name: "Sleeping Bag", price: 200 },
    { name: "Camping Lantern", price: 100 },
    { name: "Camping Chair", price: 150 }
  ];

  const toggleAccessory = (item) => {
    setSelectedAccessories((previous) =>
      previous.some((a) => a.name === item.name)
        ? previous.filter((a) => a.name !== item.name)
        : [...previous, item]
    );
  };

  const accessoryTotal = selectedAccessories.reduce(
    (total, item) => total + item.price,
    0
  );

  const totalAmount = (600 + accessoryTotal) * rentalDays;

  const proceedToBooking = () => {
    navigate("/booking", {
      state: {
        productName: "Camping Tent",
        rentalDays,
        selectedItems: selectedAccessories,
        totalAmount
      }
    });
  };

  // Average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  // Submit review
  const submitReview = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewName.trim(),
      comment: reviewText.trim(),
      rating
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    localStorage.setItem(
      "campingTentReviews",
      JSON.stringify(updatedReviews)
    );

    setRating(0);
    setReviewName("");
    setReviewText("");
  };

  return (
    <div className="camping-tent-details">
      <h1>⛺ Camping Tent</h1>
      <p>Make your outdoor trips memorable.</p>

      <h2>₹600 / day</h2>

      <h3>Select Accessories</h3>

      {accessories.map((item) => (
        <label className="tent-accessory" key={item.name}>
          <input
            type="checkbox"
            checked={selectedAccessories.some(
              (a) => a.name === item.name
            )}
            onChange={() => toggleAccessory(item)}
          />
          {item.name} — ₹{item.price} / day
        </label>
      ))}

      <h3>Rental Days</h3>

      <select
        className="tent-rental-select"
        value={rentalDays}
        onChange={(e) => setRentalDays(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5, 7, 10, 15, 30].map((day) => (
          <option key={day} value={day}>
            {day} {day === 1 ? "Day" : "Days"}
          </option>
        ))}
      </select>

      <h3>Rental Summary</h3>

      <p>
        Camping Tent: ₹600 × {rentalDays} days = ₹
        {600 * rentalDays}
      </p>

      <p>Accessories per day: ₹{accessoryTotal}</p>

      <h2>Total: ₹{totalAmount}</h2>

      <button
        className="tent-booking-button"
        onClick={proceedToBooking}
      >
        Proceed to Booking
      </button>

      {/* Customer Reviews */}
      <section className="tent-reviews">
        <h2>Customer Reviews</h2>

        <div className="tent-average-rating">
          <span className="tent-average-number">
            {averageRating}
          </span>

          <span className="tent-average-stars">
            {"★".repeat(Math.round(Number(averageRating)))}
            {"☆".repeat(5 - Math.round(Number(averageRating)))}
          </span>

          <p>
            Based on {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <form className="tent-review-form" onSubmit={submitReview}>
          <h3>Write a Review</h3>

          <div className="tent-form-group">
            <label htmlFor="tent-review-name">Your Name</label>
            <input
              id="tent-review-name"
              type="text"
              placeholder="Enter your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>

          <div className="tent-form-group">
            <label>Your Rating</label>

            <div className="tent-star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={star <= rating ? "selected" : ""}
                  onClick={() => setRating(star)}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  aria-pressed={rating === star}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="tent-form-group">
            <label htmlFor="tent-review-text">Your Review</label>
            <textarea
              id="tent-review-text"
              placeholder="Write your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
              required
            />
          </div>

          <button className="tent-submit-review" type="submit">
            Submit Review
          </button>
        </form>

        <div className="tent-review-list">
          <h3>Recent Reviews</h3>

          {reviews.length === 0 ? (
            <p className="tent-no-reviews">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div className="tent-review-item" key={review.id}>
                <h4>{review.name}</h4>

                <div
                  className="tent-review-stars"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    
    </div>
  );
}

export default CampingTentDetails;

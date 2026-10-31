
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PowerTools.css";

function PowerToolsDetails() {
  const navigate = useNavigate();

  const [rentalDays, setRentalDays] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // Review states
  const [rating, setRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("powerToolsReviews")) || [];
    } catch {
      return [];
    }
  });

  const accessories = [
    { name: "Safety Gloves", price: 50 },
    { name: "Safety Goggles", price: 40 },
    { name: "Drill Bits Set", price: 100 }
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

  const totalAmount = (400 + accessoryTotal) * rentalDays;

  const proceedToBooking = () => {
    navigate("/booking", {
      state: {
        productName: "Power Tools",
        rentalDays,
        selectedItems: selectedAccessories,
        totalAmount
      }
    });
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

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
      "powerToolsReviews",
      JSON.stringify(updatedReviews)
    );

    setRating(0);
    setReviewName("");
    setReviewText("");
  };

  return (
    <div className="power-tools-details">
      <h1>🛠️ Power Tools</h1>
      <p>Useful tools for your DIY projects.</p>

      <h2>₹400 / day</h2>

      <h3>Select Accessories</h3>

      {accessories.map((item) => (
        <label className="pt-accessory" key={item.name}>
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
        className="pt-rental-select"
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
        Power Tools: ₹400 × {rentalDays} days = ₹
        {400 * rentalDays}
      </p>

      <p>
        Accessories per day: ₹{accessoryTotal}
      </p>

      <h2>Total: ₹{totalAmount}</h2>

      <button
        className="pt-booking-button"
        onClick={proceedToBooking}
      >
        Proceed to Booking
      </button>

      {/* Reviews Section */}
      <section className="pt-reviews">
        <h2>Customer Reviews</h2>

        <div className="pt-average-rating">
          <span className="pt-average-number">
            {averageRating}
          </span>

          <span className="pt-average-stars">
            {"★".repeat(Math.round(Number(averageRating)))}
            {"☆".repeat(5 - Math.round(Number(averageRating)))}
          </span>

          <p>
            Based on {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <form className="pt-review-form" onSubmit={submitReview}>
          <h3>Write a Review</h3>

          <div className="pt-form-group">
            <label htmlFor="pt-review-name">Your Name</label>
            <input
              id="pt-review-name"
              type="text"
              placeholder="Enter your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>

          <div className="pt-form-group">
            <label>Your Rating</label>

            <div
              className="pt-star-rating"
              aria-label="Choose a rating from 1 to 5 stars"
            >
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

          <div className="pt-form-group">
            <label htmlFor="pt-review-text">Your Review</label>
            <textarea
              id="pt-review-text"
              placeholder="Write your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
              required
            />
          </div>

          <button className="pt-submit-review" type="submit">
            Submit Review
          </button>
        </form>

        <div className="pt-review-list">
          <h3>Recent Reviews</h3>

          {reviews.length === 0 ? (
            <p className="pt-no-reviews">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div className="pt-review-item" key={review.id}>
                <h4>{review.name}</h4>

                <div
                  className="pt-review-stars"
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

export default PowerToolsDetails;

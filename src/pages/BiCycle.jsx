
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BiCycle.css";

function BicycleDetails() {
  const navigate = useNavigate();

  const [rentalDays, setRentalDays] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bicycleReviews")) || [];
    } catch {
      return [];
    }
  });

  const accessories = [
    { name: "Safety Helmet", price: 100 },
    { name: "Bicycle Lock", price: 50 },
    { name: "Front Light", price: 40 }
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

  const totalAmount = (300 + accessoryTotal) * rentalDays;

  const proceedToBooking = () => {
    navigate("/booking", {
      state: {
        productName: "Bicycle",
        rentalDays,
        selectedItems: selectedAccessories,
        totalAmount
      }
    });
  };

  const submitReview = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewName.trim(),
      rating,
      comment: reviewText.trim(),
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);
    localStorage.setItem(
      "bicycleReviews",
      JSON.stringify(updatedReviews)
    );

    setReviewName("");
    setReviewText("");
    setRating(0);

    alert("Review submitted successfully!");
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="bicycle-details">
      <h1>🚲 Bicycle</h1>
      <p>Great for short rides and outdoor trips.</p>
      <h2>₹300 / day</h2>

      <h3>Select Accessories</h3>

      {accessories.map((item) => (
        <label className="bicycle-accessory" key={item.name}>
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
      <p>Bicycle: ₹300 × {rentalDays} days</p>
      <p>Accessories per day: ₹{accessoryTotal}</p>
      <h2>Total: ₹{totalAmount}</h2>

      <button
        className="bicycle-booking-button"
        onClick={proceedToBooking}
      >
        Proceed to Booking
      </button>

      {/* Ratings and Reviews */}
      <section className="bicycle-reviews">
        <h2>⭐ Ratings &amp; Reviews</h2>

        <p className="bicycle-average-rating">
          {reviews.length > 0
            ? `⭐ ${averageRating} / 5 (${reviews.length} ${
                reviews.length === 1 ? "review" : "reviews"
              })`
            : "No reviews yet. Be the first to review!"}
        </p>

        <form
          className="bicycle-review-form"
          onSubmit={submitReview}
        >
          <div className="bicycle-form-group">
            <label htmlFor="bicycleReviewName">Your Name</label>
            <input
              id="bicycleReviewName"
              type="text"
              placeholder="Enter your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>

          <div className="bicycle-form-group">
            <label>Rate this Bicycle</label>
            <div className="bicycle-star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={star <= rating ? "selected-star" : ""}
                  onClick={() => setRating(star)}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="bicycle-form-group">
            <label htmlFor="bicycleReviewText">Your Review</label>
            <textarea
              id="bicycleReviewText"
              placeholder="Write your feedback..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bicycle-submit-review"
          >
            Submit Review
          </button>
        </form>

        <div className="bicycle-review-list">
          {reviews.map((review) => (
            <article className="bicycle-review-item" key={review.id}>
              <h4>{review.name}</h4>
              <p className="bicycle-review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p>{review.comment}</p>
              <small>{review.date}</small>
            </article>
          ))}
        </div>
      </section>
     
    </div>
  );
}

export default BicycleDetails;

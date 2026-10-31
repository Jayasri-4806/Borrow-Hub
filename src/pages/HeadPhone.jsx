
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeadPhone.css";


function HeadphonesDetails() {
  const navigate = useNavigate();

  const [rentalDays, setRentalDays] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // Ratings and Reviews
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState(() =>
    JSON.parse(localStorage.getItem("headphoneReviews") || "[]")
  );

  const accessories = [
    { id: 1, name: "Carry Case", price: 50 },
    { id: 2, name: "Audio Adapter", price: 40 }
  ];

  const selectedItems = accessories.filter((item) =>
    selectedAccessories.includes(item.id)
  );

  const accessoryTotal = selectedItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const totalAmount = (200 + accessoryTotal) * rentalDays;

  const toggleAccessory = (id) => {
    setSelectedAccessories((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  };

  const proceedToBooking = () => {
    navigate("/booking", {
      state: {
        productName: "Headphones",
        rentalDays,
        selectedItems,
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
      "headphoneReviews",
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
      : "0.0";

  return (
    <div className="headphones-details">
      <h1>🎧 Headphones</h1>

      <p>Enjoy clear and quality sound.</p>

      <h2>₹200 / day</h2>

      <h3>Select Accessories</h3>

      {accessories.map((item) => (
        <label className="hp-accessory" key={item.id}>
          <input
            type="checkbox"
            checked={selectedAccessories.includes(item.id)}
            onChange={() => toggleAccessory(item.id)}
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

      <p>Headphones: ₹200 × {rentalDays} days</p>

      {selectedItems.map((item) => (
        <p key={item.id}>
          {item.name}: ₹{item.price} × {rentalDays} days
        </p>
      ))}

      <p>Accessories per day: ₹{accessoryTotal}</p>

      <h2>Total: ₹{totalAmount}</h2>

      <button
        className="hp-booking-button"
        onClick={proceedToBooking}
      >
        Proceed to Booking
      </button>

      {/* Ratings and Reviews */}
      <section className="hp-reviews">
        <h2>⭐ Ratings &amp; Reviews</h2>

        <p>
          {reviews.length > 0
            ? `⭐ ${averageRating} / 5 (${reviews.length} ${
                reviews.length === 1 ? "review" : "reviews"
              })`
            : "No reviews yet. Be the first to review!"}
        </p>

        <form className="hp-review-form" onSubmit={submitReview}>
          <label htmlFor="hpReviewName">Your Name</label>

          <input
            id="hpReviewName"
            type="text"
            placeholder="Enter your name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            required
          />

          <label>Rate these Headphones</label>

          <div className="hp-star-rating">
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

          <label htmlFor="hpReviewText">Your Review</label>

          <textarea
            id="hpReviewText"
            placeholder="Write your feedback..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />

          <button type="submit" className="hp-submit-review">
            Submit Review
          </button>
        </form>

        <div className="hp-review-list">
          {reviews.map((review) => (
            <article className="hp-review-item" key={review.id}>
              <h4>{review.name}</h4>

              <p className="hp-review-stars">
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

export default HeadphonesDetails;

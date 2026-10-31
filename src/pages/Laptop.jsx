
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Laptop.css";


function LaptopDetails() {
  const navigate = useNavigate();

  const [rentalDays, setRentalDays] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // Ratings and Reviews
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("laptopReviews") || "[]");
    } catch {
      return [];
    }
  });

  const accessories = [
    { name: "Wireless Mouse", price: 150 },
    { name: "Laptop Bag", price: 200 },
    { name: "Wireless Keyboard", price: 180 },
    { name: "Laptop Stand", price: 120 }
  ];

  // Select or Remove Accessories
  const toggleAccessory = (item) => {
    setSelectedAccessories((previous) =>
      previous.some((a) => a.name === item.name)
        ? previous.filter((a) => a.name !== item.name)
        : [...previous, item]
    );
  };

  // Calculate Amount
  const accessoryTotal = selectedAccessories.reduce(
    (total, item) => total + item.price,
    0
  );

  const totalAmount = (500 + accessoryTotal) * rentalDays;

  // Proceed to Booking
  const proceedToBooking = () => {
    navigate("/booking", {
      state: {
        productName: "Laptop",
        rentalDays,
        selectedItems: selectedAccessories,
        totalAmount
      }
    });
  };

  // Submit Review
  const submitReview = (e) => {
    e.preventDefault();

    if (!reviewName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write your review.");
      return;
    }

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
    localStorage.setItem("laptopReviews", JSON.stringify(updatedReviews));

    setReviewName("");
    setReviewText("");
    setRating(0);

    alert("Review submitted successfully!");
  };

  // Average Rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="laptop-details">
      <h1>💻 Laptop</h1>

      <p>
        A laptop suitable for coding, online classes,
        office work and everyday tasks.
      </p>

      <h2>₹500 / day</h2>

      <h3>Select Accessories</h3>

      {accessories.map((item) => (
        <label className="laptop-accessory" key={item.name}>
          <input
            type="checkbox"
            checked={selectedAccessories.some(
              (a) => a.name === item.name
            )}
            onChange={() => toggleAccessory(item)}
          />
          <span>
            {item.name} — ₹{item.price} / day
          </span>
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

      <p>Laptop: ₹500 × {rentalDays} days</p>
      <p>Accessories per day: ₹{accessoryTotal}</p>

      <h2>Total: ₹{totalAmount}</h2>

      <button
        type="button"
        className="laptop-booking-button"
        onClick={proceedToBooking}
      >
        Proceed to Booking
      </button>

      {/* Ratings and Reviews */}
      <section className="laptop-reviews">
        <h2>⭐ Ratings &amp; Reviews</h2>

        <p className="laptop-average-rating">
          {reviews.length > 0
            ? `⭐ ${averageRating} / 5 (${reviews.length} ${
                reviews.length === 1 ? "review" : "reviews"
              })`
            : "No reviews yet. Be the first to review!"}
        </p>

        <form
          onSubmit={submitReview}
          className="laptop-review-form"
        >
          <label htmlFor="reviewName">Your Name</label>

          <input
            id="reviewName"
            type="text"
            placeholder="Enter your name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            required
          />

          <label>Rate this Laptop</label>

          <div className="laptop-star-rating">
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

          <label htmlFor="reviewText">Your Review</label>

          <textarea
            id="reviewText"
            placeholder="Write your feedback..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />

          <button
            type="submit"
            className="laptop-submit-review"
          >
            Submit Review
          </button>
        </form>

        <div className="laptop-review-list">
          {reviews.map((review) => (
            <article
              className="laptop-review-item"
              key={review.id}
            >
              <h4>{review.name}</h4>

              <p className="laptop-review-stars">
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

export default LaptopDetails;

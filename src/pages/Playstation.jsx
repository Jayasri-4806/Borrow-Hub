
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Playstation.css";


function PlayStationDetails() {
  const navigate = useNavigate();
  const [rentalDays, setRentalDays] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // Ratings and Reviews
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState(() =>
    JSON.parse(localStorage.getItem("playStationReviews") || "[]")
  );

  const accessories = [
    { name: "Extra Controller", price: 200 },
    { name: "Gaming Headset", price: 150 },
    { name: "Extra Game", price: 100 }
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

  const totalAmount = (700 + accessoryTotal) * rentalDays;

  const proceedToBooking = () => {
    navigate("/booking", {
      state: {
        productName: "PlayStation",
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
      "playStationReviews",
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
    <div className="playstation-details">
      <h1>🎮 PlayStation</h1>
      <p>Enjoy gaming with your friends.</p>
      <h2>₹700 / day</h2>

      <h3>Select Accessories</h3>
      {accessories.map((item) => (
        <label className="ps-accessory" key={item.name}>
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
      <p>PlayStation: ₹700 × {rentalDays} days</p>
      <p>Accessories per day: ₹{accessoryTotal}</p>
      <h2>Total: ₹{totalAmount}</h2>

      <button onClick={proceedToBooking}>
        Proceed to Booking
      </button>


{/* Ratings and Reviews */}

{/* Ratings and Reviews */}
<section className="ps-reviews">
  <h2>⭐ Ratings &amp; Reviews</h2>

  <p className="ps-average-rating">
    {reviews.length > 0
      ? `⭐ ${averageRating} / 5 (${reviews.length} ${
          reviews.length === 1 ? "review" : "reviews"
        })`
      : "No reviews yet. Be the first to review!"}
  </p>

  <form className="ps-review-form" onSubmit={submitReview}>
    <div className="ps-form-group">
      <label htmlFor="psReviewName">Your Name</label>
      <input
        id="psReviewName"
        type="text"
        placeholder="Enter your name"
        value={reviewName}
        onChange={(e) => setReviewName(e.target.value)}
        required
      />
    </div>

    <div className="ps-form-group">
      <label>Rate this PlayStation</label>
      <div className="ps-star-rating">
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

    <div className="ps-form-group">
      <label htmlFor="psReviewText">Your Review</label>
      <textarea
        id="psReviewText"
        placeholder="Write your feedback..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
    </div>

    <button type="submit" className="ps-submit-review">
      Submit Review
    </button>
  </form>

  <div className="ps-review-list">
    {reviews.map((review) => (
      <article className="ps-review-item" key={review.id}>
        <h4>{review.name}</h4>
        <p className="ps-review-stars">
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

export default PlayStationDetails;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Books.css";

function BooksDetails() {
  const navigate = useNavigate();

  const [rentalDays, setRentalDays] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("booksReviews")) || [];
    } catch {
      return [];
    }
  });

  const accessories = [
    { name: "Bookmark", price: 10 },
    { name: "Reading Light", price: 50 }
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

  const totalAmount = (100 + accessoryTotal) * rentalDays;

  const proceedToBooking = () => {
    navigate("/booking", {
      state: {
        productName: "Books",
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
    localStorage.setItem("booksReviews", JSON.stringify(updatedReviews));

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
    <div className="books-details">
      <h1>📚 Books</h1>
      <p>Read and learn something new.</p>
      <h2>₹100 / day</h2>

      <h3>Select Accessories</h3>

      {accessories.map((item) => (
        <label className="books-accessory" key={item.name}>
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
      <p>Books: ₹100 × {rentalDays} days</p>
      <p>Accessories per day: ₹{accessoryTotal}</p>
      <h2>Total: ₹{totalAmount}</h2>

      <button
        className="books-booking-button"
        onClick={proceedToBooking}
      >
        Proceed to Booking
      </button>

      {/* Ratings and Reviews */}
      <section className="books-reviews">
        <h2>⭐ Ratings &amp; Reviews</h2>

        <p className="books-average-rating">
          {reviews.length > 0
            ? `⭐ ${averageRating} / 5 (${reviews.length} ${
                reviews.length === 1 ? "review" : "reviews"
              })`
            : "No reviews yet. Be the first to review!"}
        </p>

        <form className="books-review-form" onSubmit={submitReview}>
          <div className="books-form-group">
            <label htmlFor="booksReviewName">Your Name</label>
            <input
              id="booksReviewName"
              type="text"
              placeholder="Enter your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>

          <div className="books-form-group">
            <label>Rate these Books</label>

            <div className="books-star-rating">
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

          <div className="books-form-group">
            <label htmlFor="booksReviewText">Your Review</label>
            <textarea
              id="booksReviewText"
              placeholder="Write your feedback..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="books-submit-review">
            Submit Review
          </button>
        </form>

        <div className="books-review-list">
          {reviews.map((review) => (
            <article className="books-review-item" key={review.id}>
              <h4>{review.name}</h4>

              <p className="books-review-stars">
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

export default BooksDetails;
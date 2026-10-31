
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyRentals.css";

function MyRentals() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  const savedBookings = JSON.parse(
    localStorage.getItem("borrowHubBookings") || "[]"
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const updatedBookings = savedBookings.map((booking) => {
    const returnDate = new Date(booking.returnDate);
    returnDate.setHours(0, 0, 0, 0);

    if (
      returnDate < today &&
      booking.status !== "Cancelled"
    ) {
      return {
        ...booking,
        status: "Completed",
      };
    }

    return booking;
  });

  localStorage.setItem(
    "borrowHubBookings",
    JSON.stringify(updatedBookings)
  );

  setBookings([...updatedBookings].reverse());
}, []);
  return (
    <div className="my-rentals-page">
      <h1>My Rentals</h1>
      <p>View your booking history and rental details.</p>

      {bookings.length === 0 ? (
        <div className="no-rentals">
          <h2>No bookings yet</h2>
          <p>Your confirmed bookings will appear here.</p>
          <Link to="/explore" className="explore-btn">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="rentals-list">
          {bookings.map((booking) => (
            <div className="rental-card" key={booking.id}>
              <div className="rental-card-header">
                <h2>{booking.productName}</h2>
                <span className="rental-status">
                  {booking.status}
                </span>
              </div>

              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p>
                <strong>Customer:</strong> {booking.customerName}
              </p>
              <p>
                <strong>Start Date:</strong> {booking.startDate}
              </p>
              <p>
                <strong>Return Date:</strong> {booking.returnDate}
              </p>
              <p>
                <strong>Rental Days:</strong> {booking.rentalDays}
              </p>

              <div className="rental-total">
                Total Amount: ₹{booking.totalAmount}
              </div>

              {booking.selectedItems?.length > 0 && (
                <div className="rental-accessories">
                  <strong>Accessories:</strong>
                  {booking.selectedItems.map((item, index) => (
                    <p key={item.id ?? item.name ?? index}>
                      {item.name} — ₹{item.price} / day
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRentals;

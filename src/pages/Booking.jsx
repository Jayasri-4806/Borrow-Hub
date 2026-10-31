
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const bookingDetails = location.state;

  const productName = bookingDetails?.productName || "Laptop";

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [startDate, setStartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  function handleBooking(e) {
    e.preventDefault();

    if (returnDate <= startDate) {
      alert("Return date must be after the start date!");
      return;
    }

    const existingBookings = JSON.parse(
      localStorage.getItem("borrowHubBookings") || "[]"
    );

    // Check whether the same product is already booked
    const isUnavailable = existingBookings.some((booking) => {
      const sameProduct =
        booking.productName?.toLowerCase() === productName.toLowerCase();

      const datesOverlap =
        startDate < booking.returnDate &&
        returnDate > booking.startDate;

      return (
        sameProduct &&
        datesOverlap &&
        booking.status !== "Cancelled"
      );
    });

    if (isUnavailable) {
      alert(
        `${productName} is already booked for some of these dates. Please choose different dates.`
      );
      return;
    }

    const newBooking = {
      id: Date.now(),
      customerName,
      mobile,
      productName,
      rentalDays: bookingDetails?.rentalDays || 1,
      selectedItems: bookingDetails?.selectedItems || [],
      totalAmount: bookingDetails?.totalAmount || 500,
      startDate,
      returnDate,
      status: "Confirmed",
    };

    existingBookings.push(newBooking);

    localStorage.setItem(
      "borrowHubBookings",
      JSON.stringify(existingBookings)
    );

    setBookingConfirmed(true);
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        {bookingConfirmed ? (
          <div className="booking-success-message">
            <div className="success-icon">✓</div>

            <h1>Booking Confirmed!</h1>
            <p>Your booking details have been submitted successfully.</p>
            <p>Thank you for choosing Borrow Hub!</p>

            <div className="confirmed-details">
              <h2>Booking Details</h2>
              <p><strong>Customer:</strong> {customerName}</p>
              <p><strong>Mobile:</strong> {mobile}</p>
              <p><strong>Product:</strong> {productName}</p>
              <p><strong>Start Date:</strong> {startDate}</p>
              <p><strong>Return Date:</strong> {returnDate}</p>
              <p>
                <strong>Rental Days:</strong>{" "}
                {bookingDetails?.rentalDays || 1}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹
                {bookingDetails?.totalAmount || 500}
              </p>
            </div>
          </div>
        ) : (
          <>
            <h1>Complete Your Booking</h1>
            <p>Enter your details to continue your rental.</p>

            {bookingDetails && (
              <div className="booking-summary">
                <h2>Rental Summary</h2>
                <p>Product: {productName}</p>
                <p>Rental Days: {bookingDetails.rentalDays}</p>

                <h3>Selected Accessories</h3>

                {bookingDetails.selectedItems?.length > 0 ? (
                  bookingDetails.selectedItems.map((item, index) => (
                    <p key={item.id ?? item.name ?? index}>
                      {item.name} — ₹{item.price} / day
                    </p>
                  ))
                ) : (
                  <p>No accessories selected.</p>
                )}

                <h3>Total Amount: ₹{bookingDetails.totalAmount}</h3>
              </div>
            )}

            <form onSubmit={handleBooking}>
              <label htmlFor="customerName">Customer Name</label>
              <input
                id="customerName"
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />

              <label htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />

              <label htmlFor="startDate">Rental Start Date</label>
              <input
                id="startDate"
                type="date"
                min={today}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);

                  if (
                    returnDate &&
                    e.target.value >= returnDate
                  ) {
                    setReturnDate("");
                  }
                }}
                required
              />

              <label htmlFor="returnDate">Return Date</label>
              <input
                id="returnDate"
                type="date"
                min={startDate || today}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />

              <button
                type="submit"
                className="confirm-booking-btn"
              >
                Check Availability & Confirm
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Booking;

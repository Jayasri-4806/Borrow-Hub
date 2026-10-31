
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

useEffect(() => {
  function loadDashboardData() {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("borrowHubBookings") || "[]"
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const updatedBookings = savedBookings.map((booking) => {
        const returnDate = new Date(booking.returnDate);
        returnDate.setHours(0, 0, 0, 0);

        if (
          booking.status !== "Cancelled" &&
          booking.returnDate &&
          returnDate < today
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

      setBookings(updatedBookings);

      setWishlist(
        JSON.parse(localStorage.getItem("wishlist") || "[]")
      );

      setRecentlyViewed(
        JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
      );
    } catch {
      setBookings([]);
      setWishlist([]);
      setRecentlyViewed([]);
    }
  }

  loadDashboardData();

  window.addEventListener("focus", loadDashboardData);

  return () => {
    window.removeEventListener("focus", loadDashboardData);
  };
}, []);

  const activeBookings = bookings.filter(
    (booking) =>
      booking.status === "Confirmed" || booking.status === "Active"
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  );

  const totalSpent = bookings.reduce(
    (total, booking) =>
      total + Number(booking.totalAmount || booking.totalPrice || 0),
    0
  );

  const sections = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: "📦",
    },
    {
      title: "Active Rentals",
      value: activeBookings.length,
      icon: "🔑",
    },
    {
      title: "Completed Rentals",
      value: completedBookings.length,
      icon: "✅",
    },
    {
      title: "Total Rental Amount",
      value: `₹${totalSpent}`,
      icon: "💰",
    },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <span className="dashboard-badge">BORROW HUB</span>
        <h1>My Dashboard</h1>
        <p>Manage your rentals, wishlist and recently viewed products.</p>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-stats">
          {sections.map((item) => (
            <div className="dashboard-stat-card" key={item.title}>
              <span className="dashboard-stat-icon">{item.icon}</span>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
            </div>
          ))}
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div>
              <h2>My Rentals</h2>
              <p>Your recent booking details</p>
            </div>
            <Link to="/my-rentals">View All</Link>
          </div>

          {bookings.length === 0 ? (
            <p className="dashboard-empty">
              You haven't booked any products yet.
            </p>
          ) : (
            <div className="dashboard-booking-list">
              {bookings.slice(0, 5).map((booking, index) => (
                <article
                  className="dashboard-booking-item"
                  key={booking.id || index}
                >
                  <div>
                    <h3>
                      {booking.productName || booking.name || "Rental Product"}
                    </h3>
                    <p>
                      {booking.rentalDays || 1} rental day(s)
                    </p>
                    <p>
                      Return date: {booking.returnDate || "Not provided"}
                    </p>
                  </div>
                  <div className="dashboard-booking-right">
                    <strong>
                      ₹{booking.totalAmount || booking.totalPrice || 0}
                    </strong>
                    <span className="dashboard-status">
                      {booking.status || "Confirmed"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div>
              <h2>My Wishlist </h2>
              <p>{wishlist.length} saved product(s)</p>
            </div>
            <Link to="/wishlist">View Wishlist</Link>
          </div>

          {wishlist.length === 0 ? (
            <p className="dashboard-empty">
              Your wishlist is empty. Explore products to add favorites!
            </p>
          ) : (
            <div className="dashboard-product-grid">
              {wishlist.slice(0, 4).map((product) => (
                <article className="dashboard-product-card" key={product.id}>
                  <span>{product.icon || "📦"}</span>
                  <h3>{product.name}</h3>
                  <p>₹{product.price || 0} / day</p>
                  <Link to={product.path || "/browse"}>View Product</Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div>
              <h2>Recently Viewed </h2>
              <p>Products you viewed recently</p>
            </div>
            <Link to="/browse">Explore More</Link>
          </div>

          {recentlyViewed.length === 0 ? (
            <p className="dashboard-empty">
              No recently viewed products yet.
            </p>
          ) : (
            <div className="dashboard-product-grid">
              {recentlyViewed.slice(0, 4).map((product) => (
                <article
                  className="dashboard-product-card"
                  key={product.id}
                >
                  <span>{product.icon || "📦"}</span>
                  <h3>{product.name}</h3>
                  <p>₹{product.price || 0} / day</p>
                  <Link to={product.path || "/browse"}>View Product</Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

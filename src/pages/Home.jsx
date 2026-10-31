import "./Home.css";
import Footer from "../components/Footer";
import hero from "../assets/banner.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHandHolding,
  FaLaptop,
  FaCamera,
  FaGamepad,
  FaBicycle,
  FaTools,
  FaBook,
  FaCampground,
  FaGlassCheers
} from "react-icons/fa";



 function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

useEffect(() => {
  const savedProducts = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );

  setRecentlyViewed(savedProducts);
}, []);

  const products = [
    {
      id: 1,
      name: "Laptop",
      image: "💻",
      description: "High-performance laptop for work and study.",
      price: 500,
    },
    {
      id: 2,
      name: "Camera",
      image: "📷",
      description: "Professional camera for photography.",
      price: 800,
    },
    {
      id: 3,
      name: "PlayStation",
      image: "🎮",
      description: "Gaming console for an exciting experience.",
      price: 700,
    },
    {
      id: 4,
      name: "Headphones",
      image: "🎧",
      description: "Premium headphones with clear sound.",
      price: 200,
    },
  ];
const [wishlistCount, setWishlistCount] = useState(() => {
  try {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return Array.isArray(wishlist) ? wishlist.length : 0;
  } catch {
    return 0;
  }
});

useEffect(() => {
  const updateWishlistCount = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(Array.isArray(wishlist) ? wishlist.length : 0);
    } catch {
      setWishlistCount(0);
    }
  };

  window.addEventListener("wishlistUpdated", updateWishlistCount);
  window.addEventListener("storage", updateWishlistCount);

  updateWishlistCount();

  return () => {
    window.removeEventListener("wishlistUpdated", updateWishlistCount);
    window.removeEventListener("storage", updateWishlistCount);
  };
}, []);
  

    return(
        <>
        <nav>
            <h2 className="logo">
                 <FaHandHolding />
                BORROW HUB
            </h2>
           <ul>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/browse">Browse</Link></li>
  <li><Link to="/categories">Categories</Link></li>
 <li>
  <Link to="/wishlist">
    Wishlist  ({wishlistCount})
  </Link>
</li>
  <li><Link to="/dashboard">Dashboard</Link></li>
  <li><Link to="/login">Login</Link></li>
  <li><Link to="/signup">Signup</Link></li>
 <li><Link to="/my-rentals" className="my-rentals-link">My Rentals</Link>
</li>
</ul>
            </nav>

            <section className="banner">
  <img src={hero} alt="Borrow Hub" />

  <div className="banner-content">

  <span className="banner-badge">SMART RENTING MADE EASY</span>

  <h1>
    Borrow <span>Smarter.</span>
    <br />
    Live Better.
  </h1>

  <p>
    Rent laptops, cameras, gaming gear and more
    <br />
    at affordable prices.
  </p>

 <Link to="/browse">
  <button>Explore Now</button>
</Link>

</div>
</section>

<section className="categories">
  <h2>Popular Categories</h2>
  <p className="section-subtitle">
    Find what you need and borrow it easily.
  </p>

  <div className="category-container">

    <div className="category-card">
  <div className="category-icon">
    <FaLaptop />
  </div>
  <h3>Electronics</h3>
  <p>Laptops, phones and other gadgets.</p>
  <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

<div className="category-card">
  <div className="category-icon">
    <FaCamera />
  </div>
  <h3>Cameras</h3>
  <p>Cameras and photography equipment.</p>
 <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

<div className="category-card">
  <div className="category-icon">
    <FaGamepad />
  </div>
  <h3>Gaming</h3>
  <p>Gaming consoles and accessories.</p>
 <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

<div className="category-card">
  <div className="category-icon">
    <FaBicycle />
  </div>
  <h3>Vehicles</h3>
  <p>Bikes, cycles and travel vehicles.</p>
 <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

<div className="category-card">
  <div className="category-icon">
    <FaTools />
  </div>
  <h3>Tools</h3>
  <p>Useful tools for your projects.</p>
  <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

<div className="category-card">
  <div className="category-icon">
    <FaBook />
  </div>
  <h3>Books</h3>
  <p>Books for learning and entertainment.</p>
  <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

<div className="category-card">
  <div className="category-icon">
    <FaCampground />
  </div>
  <h3>Travel & Outdoor</h3>
  <p>Tents, backpacks and camping items.</p>
  <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

<div className="category-card">
  <div className="category-icon">
    <FaGlassCheers />
  </div>
  <h3>Events & Party</h3>
  <p>Speakers, projectors and event items.</p>
 <Link to="/browse" className="home-action-btn">
  Browse
</Link>
</div>

  </div>
</section>


<section className="products">
  <h2>Browse Products</h2>
  <p className="section-subtitle">
    Find the right product for your needs.
  </p>

  <div className="product-container">
    {products.map((product) => (
      <div className="product-card" key={product.id}>
        <div className="product-image">{product.image}</div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <span>₹{product.price} / day</span>

        <button
          onClick={() => setSelectedProduct(product)}
        >
          View Details
        </button>
      </div>
    ))}
  </div>

  {selectedProduct && (
    <div className="details-overlay">
      <div className="details-modal">
        <button
          className="details-close"
          onClick={() => setSelectedProduct(null)}
          aria-label="Close product details"
        >
          ✕
        </button>

        <div className="product-image">
          {selectedProduct.image}
        </div>

        <h2>{selectedProduct.name}</h2>
        <p>{selectedProduct.description}</p>
        <h3>₹{selectedProduct.price} / day</h3>

        <Link
          to="/browse"
          className="home-action-btn"
        >
          Continue to Browse
        </Link>
      </div>
    </div>
  )}
</section>

<section className="recently-viewed">
  <h2>Recently Viewed Products</h2>
  <p className="section-subtitle">
    Pick up where you left off.
  </p>

  {recentlyViewed.length === 0 ? (
    <p className="recently-empty">
      No recently viewed products yet. Explore products to see them here!
    </p>
  ) : (
    <div className="product-container">
      {recentlyViewed.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image">
            {product.icon || product.image || "📦"}
          </div>

          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span>₹{product.price} / day</span>

          <Link
            to={
              {
                Laptop: "/laptop-details",
                Camera: "/camera-details",
                PlayStation: "/playstation-details",
                Headphones: "/headphones-details",
                Bicycle: "/bicycle-details",
                Books: "/books-details",
                "Power Tools": "/power-tools-details",
                "Camping Tent": "/camping-tent-details",
              }[product.name] || "/browse"
            }
          >
            <button>View Product</button>
          </Link>
        </div>
      ))}
    </div>
  )}
</section>

<section className="how-it-works">
  <h2>How Borrow Hub Works</h2>

  <p className="section-subtitle">
    Borrow what you need in just three simple steps.
  </p>

  <div className="steps-container">

    <div className="step-card">
      <div className="step-number">01</div>
      <h3>Browse</h3>
      <p>
        Explore a wide range of products available for borrowing.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">02</div>
      <h3>Borrow</h3>
      <p>
        Choose the product you need and check the borrowing details.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">03</div>
      <h3>Return</h3>
      <p>
        Use the product and return it on the agreed date.
      </p>
    </div>

  </div>

    </section>

    <section className="cta">
      <div className="cta-content">
        <h2>Ready to Borrow?</h2>
        <p>
          Find the products you need and borrow them easily at affordable prices.
        </p>
        <Link to="/browse" className="home-action-btn">
  Start Browsing
</Link>
      </div>
       </section>

    <Footer />
  </>
  );
}

export default Home;
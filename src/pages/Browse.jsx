
import { Link } from "react-router-dom";
import "./Browse.css";
import { useState } from "react";

function Browse() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Save recently viewed products
  const saveRecentlyViewed = (product) => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem("recentlyViewed") || "[]"
      );

      const updatedProducts = [
        product,
        ...savedProducts.filter((item) => item.id !== product.id),
      ].slice(0, 4);

      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(updatedProducts)
      );
    } catch (error) {
      console.error("Unable to save recently viewed products", error);
    }
  };

  // Add product to Wishlist
  const addToWishlist = (product) => {
    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      if (!Array.isArray(savedWishlist)) {
        alert("Unable to read Wishlist. Please refresh the page.");
        return;
      }

      const alreadyExists = savedWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        alert("Product already in Wishlist ");
        return;
      }

      const updatedWishlist = [...savedWishlist, product];

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      window.dispatchEvent(new Event("wishlistUpdated"));

      alert("Product added to Wishlist ");
    } catch (error) {
      console.error("Unable to update Wishlist", error);
      alert("Unable to add product. Please try again.");
    }
  };

  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 500,
      icon: "💻",
      description: "Perfect for work, coding and study.",
    },
    {
      id: 2,
      name: "Camera",
      category: "Cameras",
      price: 800,
      icon: "📷",
      description: "Capture your special moments.",
    },
    {
      id: 3,
      name: "PlayStation",
      category: "Gaming",
      price: 700,
      icon: "🎮",
      description: "Enjoy gaming with your friends.",
    },
    {
      id: 4,
      name: "Headphones",
      category: "Electronics",
      price: 200,
      icon: "🎧",
      description: "Enjoy clear and quality sound.",
    },
    {
      id: 5,
      name: "Bicycle",
      category: "Vehicles",
      price: 300,
      icon: "🚲",
      description: "Great for short rides and outings.",
    },
    {
      id: 6,
      name: "Books",
      category: "Books",
      price: 100,
      icon: "📚",
      description: "Read and learn something new.",
    },
    {
      id: 7,
      name: "Power Tools",
      category: "Tools",
      price: 400,
      icon: "🛠️",
      description: "Useful tools for your DIY projects.",
    },
    {
      id: 8,
      name: "Camping Tent",
      category: "Travel",
      price: 600,
      icon: "⛺",
      description: "Make your outdoor trips memorable.",
    },
  ];

  const getProductPath = (productName) => {
    const paths = {
      Laptop: "/laptop-details",
      Camera: "/camera-details",
      PlayStation: "/playstation-details",
      Headphones: "/headphones-details",
      Bicycle: "/bicycle-details",
      Books: "/books-details",
      "Power Tools": "/power-tools-details",
      "Camping Tent": "/camping-tent-details",
    };

    return paths[productName] || "/browse";
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="browse-page">
      <section className="browse-header">
        <span className="browse-badge">
          BORROW MORE, SPEND LESS
        </span>

        <h1>Explore Products</h1>
        <p>Find what you need. Borrow what you love.</p>
      </section>

      <section className="browse-content">
        <div className="browse-controls">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Cameras">Cameras</option>
            <option value="Gaming">Gaming</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Tools">Tools</option>
            <option value="Books">Books</option>
            <option value="Travel">Travel & Outdoor</option>
          </select>
        </div>

        <p className="browse-count">
          Showing {filteredProducts.length} products
        </p>

        <div className="browse-product-grid">
          {filteredProducts.map((product) => (
            <div className="browse-product-card" key={product.id}>
              <div className="browse-product-icon">
                {product.icon}
              </div>

              <span className="browse-product-category">
                {product.category}
              </span>

              <Link
                to={getProductPath(product.name)}
                className="browse-product-title"
                onClick={() => saveRecentlyViewed(product)}
              >
                <h3>{product.name}</h3>
              </Link>

              <p className="browse-product-description">
                {product.description}
              </p>

              <div className="browse-product-bottom">
                <span className="browse-price">
                  ₹{product.price}
                  <small> / day</small>
                </span>

                <Link
                  to={getProductPath(product.name)}
                  className="rent-now-btn"
                  onClick={() => saveRecentlyViewed(product)}
                >
                  Rent Now
                </Link>

                <button
                  type="button"
                  className="wishlist-add-btn"
                  onClick={() => addToWishlist(product)}
                >
                   Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="browse-empty">
            <span>🔎</span>
            <h3>No products found</h3>
            <p>Try another product name or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Browse;

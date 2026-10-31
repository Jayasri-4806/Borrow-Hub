
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (indexToRemove) => {
    const updatedWishlist = wishlist.filter(
      (_, index) => index !== indexToRemove
    );

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const rentProduct = (product) => {
    if (product.path) {
      navigate(product.path);
    } else {
      navigate("/browse");
    }
  };
  const addToWishlist = (product) => {
  const savedWishlist = JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  );

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

  alert("Product added to Wishlist ");
};

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist </h1>
        <p>Your favourite rental products in one place.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon"></div>
          <h2>Your Wishlist is Empty</h2>
          <p>
            You haven't added any favourite products yet.
            Explore products and save your favourites here!
          </p>

          <button onClick={() => navigate("/browse")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product, index) => (
            <div
              className="wishlist-card"
              key={product.id || `${product.name}-${index}`}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name || "Rental product"}
                  className="wishlist-product-image"
                />
              ) : (
                <div className="wishlist-product-placeholder">
                  {product.icon || "📦"}
                </div>
              )}

              <div className="wishlist-card-content">
                <h2>{product.name || product.productName || "Product"}</h2>

                <p className="wishlist-price">
                  ₹{product.price ?? product.rentalPrice ?? product.amount ?? 0}
                  <span> / day</span>
                </p>

                <div className="wishlist-actions">
                  <button
                    className="wishlist-rent-button"
                    onClick={() => rentProduct(product)}
                  >
                    Rent Now
                  </button>

                  <button
                    className="wishlist-remove-button"
                    onClick={() => removeFromWishlist(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

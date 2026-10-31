
import { useNavigate } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Laptop",
      icon: "💻",
      description: "Laptops for coding, study and office work",
      path: "/laptop-details",
    },
    {
      name: "Camera",
      icon: "📸",
      description: "Cameras for photography and special events",
      path: "/camera-details",
    },
    {
      name: "Camping Tent",
      icon: "⛺",
      description: "Camping essentials for outdoor adventures",
      path: "/camping-tent-details",
    },
    {
      name: "PlayStation",
      icon: "🎮",
      description: "Gaming consoles for entertainment",
      path: "/playstation-details",
    },
  ];

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Explore Categories</h1>
        <p>
          Choose a category and rent your favourite products.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>
            <div className="category-icon">
              {category.icon}
            </div>

            <h2>{category.name}</h2>

            <p>{category.description}</p>

            <button
              type="button"
              onClick={() => navigate(category.path)}
            >
              Explore Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;

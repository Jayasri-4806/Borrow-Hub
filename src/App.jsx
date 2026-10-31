
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Browse from "./pages/Browse";
import Laptop from "./pages/Laptop";
import Booking from "./pages/Booking";

import Camera from "./pages/Camera";
import Playstation from "./pages/Playstation";
import HeadPhone from "./pages/HeadPhone";
import BiCycle from "./pages/BiCycle";
import Books from "./pages/Books";
import PowerTools from "./pages/PowerTools";
import CampingTent from "./pages/CampingTent";
import MyRentals from "./pages/MyRentals";
import Categories from "./pages/Categories";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/browse" element={<Browse />} />

      <Route path="/laptop-details" element={<Laptop />} />
      <Route path="/camera-details" element={<Camera />} />
      <Route path="/playstation-details" element={<Playstation />} />
      <Route path="/headphones-details" element={<HeadPhone />} />
      <Route path="/bicycle-details" element={<BiCycle />} />
      <Route path="/books-details" element={<Books />} />
      <Route path="/power-tools-details" element={<PowerTools />} />
      <Route path="/camping-tent-details" element={<CampingTent />} />

      <Route path="/booking" element={<Booking />} />
      <Route path="/my-rentals" element={<MyRentals />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

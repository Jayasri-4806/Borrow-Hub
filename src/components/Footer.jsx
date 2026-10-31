
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaHandHolding,
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaLinkedin
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <h2>
            <FaHandHolding /> BORROW HUB
          </h2>
          <p>
            Borrow what you need, when you need it.
            Save money and make smart renting simple.
          </p>

          <div className="footer-socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><FaEnvelope /> support@borrowhub.com</p>
          <p><FaPhone /> Contact our support team</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Borrow Hub. All rights reserved.</p>
        <p>Borrow Smart. Save More.</p>
      </div>
    </footer>
  );
}

export default Footer;

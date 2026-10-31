
import { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Login.css";
import "../components/Signup.css";
import hero from "../assets/banner.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage(
      "Signup form validated! Backend integration is needed to create an account."
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-visual">
          <img src={hero} alt="Borrow Hub rental marketplace" />
          <div className="auth-visual-content">
            <h1>Join Borrow Hub.</h1>
            <p>Borrow what you need. Save more every day.</p>
          </div>
        </div>

        <div className="auth-form-panel">
          <Link to="/" className="auth-brand">
            BORROW HUB
          </Link>

          <h2>Create Account</h2>
          <p className="auth-subtitle">
            Sign up to get started with Borrow Hub.
          </p>

          <form onSubmit={handleSignup}>
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />

            <button type="submit" className="auth-submit">
              Create Account
            </button>
          </form>

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <Link to="/" className="auth-back">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Signup;

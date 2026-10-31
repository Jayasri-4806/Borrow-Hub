
import { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Login.css";
import hero from "../assets/banner.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setMessage(
      "Frontend demo only. Connect a backend to verify your login."
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-visual">
          <img src={hero} alt="Borrow Hub rental marketplace" />
          <div className="auth-visual-content">
            <h1>Borrow Smarter.</h1>
            <p>Everything you need, whenever you need it.</p>
          </div>
        </div>

        <div className="auth-form-panel">
          <Link to="/" className="auth-brand">
            BORROW HUB
          </Link>

          <h2>Welcome Back!</h2>
          <p className="auth-subtitle">
            Sign in to continue to your account.
          </p>

          <form onSubmit={handleLogin}>
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="auth-submit">
              Login
            </button>
          </form>

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <Link to="/" className="auth-back">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;

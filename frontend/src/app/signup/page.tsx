"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "../services/authService";
import "../login/login.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Call backend to create profile with ID token (not UID)
        const res = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
            method: "POST",
            body: JSON.stringify({ email: user.email })
        });

        router.push("/modules");
    } catch (err: any) {
      let errorMessage = "Account creation failed. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use. Please use a different email.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (err.code === "auth/operation-not-allowed") {
        errorMessage = "Email/password accounts are not enabled.";
      }

      setError(errorMessage);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Create your account</h1>

        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              marginBottom: "1rem",
              padding: "0.5rem",
              backgroundColor: "#ffecec",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-btn">
              Sign up With Google
            </button>
            <button type="button" className="social-btn">
              Sign up With Passkey
            </button>
            <button type="button" className="social-btn">
              Sign up With SSO
            </button>
          </div>

          <p className="signup-text">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </section>
    </main>
  );
}

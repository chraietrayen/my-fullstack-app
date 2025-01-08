import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import purpleImage from '../../images/purple.jpg';  // Import the image here

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isHovering, setIsHovering] = useState(false); // State for button hover
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/test"); // Redirect to the protected page on successful login
    } catch (err) {
      setError("Invalid email or password. Please try again."); // Friendly error message
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError(""); // Clear error message if any
    } catch (err) {
      setError("Failed to send password reset email. Check your email address.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Sidebar inside the card */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarText}>Welcome to My Website</h2>
        </div>

        {/* Login form inside the card */}
        <div style={styles.loginContainer}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email:</label>
              <div style={styles.inputContainer}>
                <FaEnvelope style={styles.icon} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password:</label>
              <div style={styles.inputContainer}>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                style={styles.forgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              style={isHovering ? { ...styles.dynamicButton, ...styles.dynamicButtonHover } : styles.dynamicButton}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Login
            </button>
          </form>

          <p style={styles.text}>
            Don’t have an account? <a href="/register" style={styles.link}>Register here</a> .
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${purpleImage})`,  // Use the imported image here
    backgroundSize: "cover", // Make the image cover the entire background
    backgroundPosition: "center", // Center the image
    backgroundAttachment: "fixed", // Optional: makes the background fixed when scrolling
  },
  card: {
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background for the card
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    width: "70%",
    maxWidth: "800px",
    overflow: "hidden",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#7a4cdd", // Purple color for sidebar
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "20px",
  },
  sidebarText: {
    textAlign: "center",
    fontSize: "24px",
  },
  loginContainer: {
    width: "70%",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
  },
  inputGroup: {
    marginBottom: "25px",
    position: "relative",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    color: "#333",
    fontWeight: "bold",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd", // Light gray border for input fields
    borderRadius: "5px",
    padding: "0 15px",
    backgroundColor: "#f8f8f8", // Lighter background for inputs
  },
  icon: {
    color: "#7a4cdd", // Purple icon color
    marginRight: "12px",
  },
  input: {
    width: "100%",
    padding: "15px 10px",
    fontSize: "16px",
    border: "none",
    backgroundColor: "transparent",
    color: "#333", // Dark text in inputs
    outline: "none",
  },
  forgotPassword: {
    position: "absolute",
    top: "-20px",
    right: "0",
    backgroundColor: "transparent",
    border: "none",
    color: "#7a4cdd",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  dynamicButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#6a0dad", // Purple button
    color: "#fff",
    border: "2px solid #6a0dad", // Purple border
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
  },
  dynamicButtonHover: {
    backgroundColor: "transparent", // Transparent on hover
    color: "#6a0dad", // Purple text on hover
    border: "2px solid #6a0dad", // Maintain purple border
    transform: "translateY(-5px)", // Button moves up on hover
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)", // Hover shadow effect
  },
  success: {
    color: "green",
    fontSize: "14px",
    marginBottom: "15px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "15px",
  },
  text: {
    textAlign: "center",
    marginTop: "20px",
    color: "#333",
  },
  link: {
    color: "#1e90ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
  
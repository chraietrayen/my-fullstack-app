import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaGoogle } from "react-icons/fa";
import purpleImage from '../../images/purple.jpg';  // Import the image here

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/test"); // Redirect to the main page after Google sign-in
    } catch (err) {
      setError(err.message);
    }
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [googleButtonHover, setGoogleButtonHover] = useState(false);

  return (
    <div style={{ ...styles.mainContainer, backgroundImage: `url(${purpleImage})` }}>
      <div style={styles.container}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>Registration successful! Redirecting to login...</p>}

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
          </div>

          <button
            type="submit"
            style={buttonHover ? { ...styles.dynamicButton, ...styles.dynamicButtonHover } : styles.dynamicButton}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            <FaEnvelope style={styles.buttonIcon} /> Register
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>OR</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          style={googleButtonHover ? { ...styles.dynamicGoogleButton, ...styles.dynamicGoogleButtonHover } : styles.dynamicGoogleButton}
          onMouseEnter={() => setGoogleButtonHover(true)}
          onMouseLeave={() => setGoogleButtonHover(false)}
        >
          <FaGoogle style={styles.buttonIcon} /> Continue with Google
        </button>

        <p style={styles.text}>
          Already have an account? <a href="/login" style={styles.link}>Login here</a>.
        </p>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    width: "100%",
    height: "100vh", // Make sure the background covers the full screen
    backgroundSize: "cover",  // Make the image cover the entire screen
    backgroundPosition: "center", // Center the image
    backgroundAttachment: "fixed", // Optional: makes the background fixed when scrolling
  },
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black overlay
    border: "1px solid #fff", // White border for contrast
  },
  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #fff", // White border for input fields
    borderRadius: "5px",
    padding: "0 15px",
    backgroundColor: "#333", // Darker background for inputs
  },
  icon: {
    color: "#d4af37", // Gold icon color
    marginRight: "12px",
  },
  input: {
    width: "100%",
    padding: "15px 10px",
    fontSize: "16px",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    color: "#fff", // White text in inputs
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
  },
  dynamicButtonHover: {
    backgroundColor: "transparent", // Transparent on hover
    color: "#6a0dad", // Purple text on hover
    border: "2px solid #6a0dad", // Maintain purple border
    transform: "translateY(-5px)", // Button moves up on hover
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)", // Hover shadow effect
  },
  dynamicGoogleButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "transparent",
    color: "#4285F4", // Google blue
    border: "2px solid #4285F4", // Google border color
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
    transition: "all 0.3s ease",
  },
  dynamicGoogleButtonHover: {
    backgroundColor: "#4285F4", // Google blue background on hover
    color: "#fff",
  },
  buttonIcon: {
    fontSize: "20px",
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
  divider: {
    textAlign: "center",
    margin: "20px 0",
  },
  dividerText: {
    backgroundColor: "#fff",
    padding: "0 10px",
    color: "#555",
  },
  text: {
    textAlign: "center",
    marginTop: "20px",
    color: "#fff",
  },
  link: {
    color: "#1e90ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;

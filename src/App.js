import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Login from "./components/LoginPage/Login";
import Register from "./components/LoginPage/Register"; // Import Register component
import Test from "./components/LoginPage/Test";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Redirect based on auth */}
        <Route
          path="/"
          element={authenticated ? <Navigate to="/test" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add Register Route */}
        <Route path="/test" element={authenticated ? <Test /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<div>Page Not Found</div>} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
};

const styles = {
  loading: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "50px",
  },
};

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from 'react-icons/fa'; // Importing a search icon from react-icons

const Test = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(""); // Search query for city or place
  const [suggestions, setSuggestions] = useState([]);

  // Fetch weather data when a city is selected
  const fetchWeather = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again later.");
      setLoading(false);
    }
  };

  // Handle input change and fetch location suggestions
  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${e.target.value}&type=like&units=metric&appid=${apiKey}`
        );
        setSuggestions(response.data.list);
      } catch (err) {
        setSuggestions([]);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (lat, lon) => {
    setQuery(""); // Clear the input after selecting
    setSuggestions([]); // Clear suggestions
    fetchWeather(lat, lon);
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.header}>Weather Search</h1>

      {/* Search Input with Icon */}
      <div style={styles.searchWrapper}>
        <div style={styles.searchIconWrapper}>
          <FaSearch style={styles.searchIcon} />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city or place"
          style={styles.searchInput}
        />

        {/* Suggestions List */}
        {suggestions.length > 0 && (
          <div style={styles.suggestionsList}>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() =>
                  handleSuggestionClick(suggestion.coord.lat, suggestion.coord.lon)
                }
                style={styles.suggestionItem}
              >
                {suggestion.name}, {suggestion.sys.country}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weather Display */}
      <div style={styles.weatherInfo}>
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading weather...</p>
        ) : weatherData ? (
          <div style={styles.weatherData}>
            <h4>{weatherData.name}</h4>
            <p>{weatherData.weather[0].description}</p>
            <p>{weatherData.main.temp}°C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              style={styles.weatherIcon}
            />
          </div>
        ) : (
          <p>No weather data available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "2em",
    marginBottom: "20px",
    color: "#333",
  },
  searchWrapper: {
    position: "relative",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px 40px 10px 10px", // Add padding for the icon
    width: "80%",
    maxWidth: "500px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  searchIconWrapper: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    zIndex: "1",
  },
  searchIcon: {
    fontSize: "18px",
    color: "#ccc",
  },
  suggestionsList: {
    position: "absolute",
    top: "45px", // Adjust the position accordingly
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    maxWidth: "500px",
    maxHeight: "200px",
    overflowY: "auto",
    backgroundColor: "white",
    border: "1px solid #ccc",
    zIndex: 10,
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#fff",
  },
  weatherInfo: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "18px",
    color: "#444",
  },
  weatherData: {
    fontSize: "16px",
    textAlign: "center",
  },
  weatherIcon: {
    marginTop: "10px",
    width: "50px",
    height: "50px",
  },
};

export default Test;

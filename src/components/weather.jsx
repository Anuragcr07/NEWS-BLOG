import React, { useEffect, useState } from "react";
import axios from "axios";
import "./weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(""); 
  useEffect (() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation ="Chandigarh"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=f6587fc9e10b8819098ff89f89c9bce6`;
     const response =await axios.get(url);
     setData(response.data);
  }
  fetchDefaultLocation();
},[])

  const search = async () => {
    if (!location) return; // Prevents empty search requests

    const apiKey = "f6587fc9e10b8819098ff89f89c9bce6"; // Replace with a valid key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
      console.log("Fetching data..."); // Debugging
      const response = await axios.get(url);
      setData(response.data);
      setError(""); // Clear errors if successful
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Check city name or try again.");
    }

    setLocation(""); // Clear input after search
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const getWeatherIcon = (weathertype) => {
    if (!weathertype) return "bx bx-cloud"; // Handle undefined cases
  
    switch (weathertype.toLowerCase()) { // Normalize to lowercase for safety
      case "clear":
        return <i className="bx bxs-sun"></i>;
      case "clouds":
        return <i className="bx bxs-cloud"></i>;
      case "rain":
        return <i className="bx bxs-cloud-rain"></i>
      case "drizzle":
        return <i className="bx bxs-cloud-drizzle"></i>;
      case "snow":
        return <i className="bx bx-cloud-snow"></i>;
        case "thunderstorm":
          return <i className="bx bxs-cloud-lightning"></i>;
        case "mist":
          return <i className="bx bxs-cloud-hail"></i>;
        case "haze":
          return <i className="bx bxs-cloud-haze"></i>;
        case "sand":
          return <i className="bx bxs-cloud-sand"></i>;
        case "tornado":
          return <i className="bx bxs-cloud-tornado"></i>;
      default:
        return "bx bx-cloud";
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name || "Enter a location"}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDown} // Fix: onKeyPress is deprecated
          />
          <button onClick={search} className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      
      {error && <div className="error">{error}</div>} {/* Show error if exists */}

      <div className="weather-data">
        {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}
        
        <div className="weather-type">{data.weather?.[0]?.main || "N/A"}</div>
        <div className="temp">{data.main?.temp ? `${Math.floor(data.main.temp)}℃` : "N/A"}</div>
      </div>
    </div>
  );
};

export default Weather;

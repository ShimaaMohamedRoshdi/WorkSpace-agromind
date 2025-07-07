
import React, { useState } from "react";
import axios from "axios";

const LocationSearch = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);

  // OpenCage Geocoder API key (replace with your actual key)
  const API_KEY = "30777d3223bb49bd815e0aba76703a82"; // Replace this with your API key
  const BASE_URL = `https://api.opencagedata.com/geocode/v1/json`;

  // Function to search for locations
  const searchLocation = async (e) => {
    if (e.key === "Enter" && query.trim()) {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: query,
            key: API_KEY,
          },
        });
        setLocations(response.data.results);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }
  };

  // Function to handle click on suggestion
  const handleLocationClick = (location) => {
    setQuery(location.formatted); // Set the selected location as the query
    onLocationSelect(location); // Pass selected location to parent
    setLocations([]); // Optionally clear the suggestions after selection
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={searchLocation}
        placeholder="Search for a location"
        className="w-full border p-2"
      />
      {locations.length > 0 && (
        <ul className="mt-2 border p-2">
          {locations.map((location, index) => (
            <li
              key={index}
              onClick={() => handleLocationClick(location)} // Handle click
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {location.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;

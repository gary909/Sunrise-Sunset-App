import React, { useState } from "react";
import axios from "axios";
import { SunriseSunsetResponse, Location } from "../types";

const SunriseSunset: React.FC = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [sunrise, setSunrise] = useState<string>("");
  const [sunset, setSunset] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: parseFloat(value) });
  };

  const fetchSunriseSunset = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get<SunriseSunsetResponse>(
        `https://api.sunrisesunset.io/json?lat=${location.latitude}&lng=${location.longitude}&formatted=0`
      );
      setSunrise(new Date(response.data.results.sunrise).toLocaleTimeString());
      setSunset(new Date(response.data.results.sunset).toLocaleTimeString());
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sunrise and Sunset Times</h1>
      <div>
        <label>
          Latitude:
          <input
            type="number"
            name="latitude"
            value={location.latitude}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Longitude:
          <input
            type="number"
            name="longitude"
            value={location.longitude}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={fetchSunriseSunset} disabled={loading}>
        {loading ? "Loading..." : "Get Sunrise and Sunset Times"}
      </button>
      {error && <p>{error}</p>}
      {sunrise && sunset && (
        <div>
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
        </div>
      )}
    </div>
  );
};

export default SunriseSunset;

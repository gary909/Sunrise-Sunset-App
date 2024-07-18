import React, { useState } from "react";
import axios from "axios";
import { SunriseSunsetResponse, Location } from "../types";

const SunriseSunset: React.FC = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [sunriseSunsetData, setSunriseSunsetData] = useState<
    SunriseSunsetResponse["results"] | null
  >(null);

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
      setSunriseSunsetData(response.data.results);
      console.log("Latitude:", location.latitude);
      console.log("Sunrise:", response.data.results.sunrise);
      console.log("Longitude:", location.longitude);
      console.log("Sunset:", response.data.results.sunset);
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
      {sunriseSunsetData && (
        <div>
          <p>Sunrise: {sunriseSunsetData.sunrise}</p>
          <p>Sunset: {sunriseSunsetData.sunset}</p>
        </div>
      )}
    </div>
  );
};

export default SunriseSunset;

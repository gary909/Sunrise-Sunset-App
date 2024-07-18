export interface SunriseSunsetResponse {
  results: {
    sunrise: string;
    sunset: string;
  };
  status: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

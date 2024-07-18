import React from "react";
import "./App.css";
import SunriseSunset from "./components/SunriseSunset";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <SunriseSunset />
      </header>
    </div>
  );
};

export default App;

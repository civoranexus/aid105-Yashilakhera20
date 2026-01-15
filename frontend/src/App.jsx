import { useState } from "react";
import Login from "./Login";
import "./index.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="logo-circle">GY</div>

        <h1 className="app-title">Gov-Yojnaarthi</h1>

        <p className="tagline">
          Your Digital Companion for Government Schemes
        </p>

        <button
          className="start-btn"
          onClick={() => setShowLogin(true)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;

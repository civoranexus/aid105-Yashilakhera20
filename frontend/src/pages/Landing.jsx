import { useNavigate } from "react-router-dom";
import "../App.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container fade-in">
      <div className="landing-card slide-up">
        <h1 className="app-title">Gov-Yojnaarthi</h1>

        <p className="app-tagline">
          Your Digital Companion for Government Schemes
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/user-type")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;

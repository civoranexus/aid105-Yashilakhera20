import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user-type");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-container fade-in">
      <div className="landing-card slide-up">
        <h1 className="app-title">Gov-Yojnaarthi</h1>

        <p className="app-tagline">
          Your Digital Companion for Government Schemes
        </p>
      </div>
    </div>
  );
}

export default Splash;

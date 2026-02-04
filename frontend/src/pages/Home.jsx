import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header className="app-header">
        <span className="app-title">Gov-Yojnaarthi</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* PAGE CONTENT */}
      <div className="home-container">
        <h1>Government Schemes & Benefits</h1>

        <p>
          Gov-Yojnaarthi helps citizens discover government welfare schemes
          based on eligibility, income, category, and location.
        </p>

        <p>
          Click below to check which schemes you are eligible for.
        </p>

        {/* CHECK ELIGIBILITY BUTTON */}
        <button
          className="check-eligibility-btn"
          onClick={() => navigate("/dashboard")}
        >
          Check Eligibility
        </button>
      </div>
    </>
  );
}

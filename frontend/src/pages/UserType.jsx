import { useNavigate } from "react-router-dom";
import "../App.css";

function UserType() {
  const navigate = useNavigate();

  return (
    <div className="landing-container fade-in">
      <div className="landing-card slide-up">
        <h2 className="app-title">Which type of user are you?</h2>

        <p className="app-tagline">
          Choose an option to continue
        </p>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <button
            className="start-btn"
            onClick={() => navigate("/signup")}
          >
            New User
          </button>

          <button
            className="start-btn"
            onClick={() => navigate("/login")}
          >
            Existing User
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserType;

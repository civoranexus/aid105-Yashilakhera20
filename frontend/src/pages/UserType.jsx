import { useNavigate } from "react-router-dom";

export default function UserType() {
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <div className="card">
        <h2>Choose Your Journey</h2>

        <button onClick={() => navigate("/login")}>
          Existing User
        </button>

        <button onClick={() => navigate("/signup")} className="outline">
          New User
        </button>
      </div>
    </div>
  );
}

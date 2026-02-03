import { useNavigate } from "react-router-dom";

function UserType() {
  const navigate = useNavigate();

  return (
    <section className="page slide-up">
      <h2>Choose Your Journey</h2>

      <div className="button-group">
        <button onClick={() => navigate("/login")}>
          Existing User
        </button>
        <button onClick={() => navigate("/signup")}>
          New User
        </button>
      </div>
    </section>
  );
}

export default UserType;

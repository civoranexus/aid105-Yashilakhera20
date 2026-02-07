import { useNavigate } from "react-router-dom";

export default function UserType() {
  const nav = useNavigate();
  return (
    <div className="container">
      <div className="card">
        <h2>Choose Your Journey</h2>
        <button onClick={() => nav("/login")}>Existing User</button>
        <button onClick={() => nav("/signup")}>New User</button>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

<button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }}
>
  Logout
</button>

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="container">
      <div className="card">
        <h2>Government Schemes & Benefits</h2>
        <p>Check your eligibility in one click.</p>
        <button onClick={() => nav("/dashboard")}>Check Eligibility</button>
      </div>
    </div>
  );
}

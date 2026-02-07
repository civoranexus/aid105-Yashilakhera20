import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <div className="card">
        <div className="logo-circle">GY</div>
        <h2>Gov-Yojnaarthi</h2>
        <p>Your Digital Companion for Government Schemes</p>
        <button onClick={() => navigate("/user-type")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

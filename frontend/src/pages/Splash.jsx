import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/landing"), 3000);
  }, []);

  return (
    <div className="splash">
      <div className="logo-circle">GY</div>
      <h1>Gov-Yojnaarthi</h1>
      <p>Your Digital Companion for Government Schemes</p>
    </div>
  );
}

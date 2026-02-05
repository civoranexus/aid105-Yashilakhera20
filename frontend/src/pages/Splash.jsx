import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/user-type"), 3000);
  }, []);

  return (
    <div className="center-screen">
      <h1>Gov-Yojnaarthi</h1>
      <p>Your Digital Companion for Government Schemes</p>
    </div>
  );
}

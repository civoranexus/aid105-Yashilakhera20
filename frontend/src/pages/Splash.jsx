import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Splash() {
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => nav("/user-type"), 3000);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Gov-Yojnaarthi</h1>
        <p>Your Digital Companion for Government Schemes</p>
      </div>
    </div>
  );
}

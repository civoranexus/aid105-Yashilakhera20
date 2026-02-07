import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const nav = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const login = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    if (res.ok) nav("/home");
    else alert("Invalid credentials");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <input placeholder="Username" onChange={e=>setU(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setP(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

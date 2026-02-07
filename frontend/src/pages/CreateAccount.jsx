import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateAccount() {
  const nav = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const submit = async () => {
    await fetch("http://127.0.0.1:8000/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    alert("Account created");
    nav("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>
        <input placeholder="Username" onChange={e=>setU(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setP(e.target.value)} />
        <button onClick={submit}>Create Account</button>
      </div>
    </div>
  );
}

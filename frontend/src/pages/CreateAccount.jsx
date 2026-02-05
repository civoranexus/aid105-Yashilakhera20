import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Account creation failed");
        return;
      }

      alert("Account created successfully");
      navigate("/login");

    } catch {
      alert("Server not reachable");
    }
  };

  return (
    <div className="page">
      <h2>Create Account</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
}

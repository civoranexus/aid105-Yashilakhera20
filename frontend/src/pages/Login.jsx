import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    if (!res.ok) {
      setError("Invalid username or password");
      return;
    }

    // ✅ LOGIN SUCCESS
    localStorage.setItem("isLoggedIn", "true");

    // 🔴 THIS LINE CONNECTS LOGIN → DASHBOARD
    navigate("/dashboard");
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h2 className="form-title">Existing User Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default Login;

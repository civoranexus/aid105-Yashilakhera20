import { useState } from "react";
import Login from "./Login";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // If user is not logged in
  if (!token) {
    return <Login setToken={setToken} setRole={setRole} />;
  }

  return (
    <div className="container">
      <h1>SchemeAssist AI</h1>
      <p className="role">Logged in as: <b>{role}</b></p>

      {role === "citizen" && <CitizenDashboard token={token} />}
      {role === "admin" && <AdminDashboard token={token} />}
    </div>
  );
}

/* ======================
   Citizen Dashboard
====================== */
function CitizenDashboard({ token }) {
  const [form, setForm] = useState({
    age: "",
    income: "",
    location: "rural",
    need: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getRecommendations = async () => {
    const response = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        age: Number(form.age),
        income: Number(form.income),
        location: form.location,
        need: form.need,
      }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="card">
      <h2>Citizen Dashboard</h2>

      <input
        name="age"
        placeholder="Age"
        onChange={handleChange}
      />

      <input
        name="income"
        placeholder="Income"
        onChange={handleChange}
      />

      <select name="location" onChange={handleChange}>
        <option value="rural">Rural</option>
        <option value="urban">Urban</option>
      </select>

      <input
        name="need"
        placeholder="Need (education, housing, etc)"
        onChange={handleChange}
      />

      <button onClick={getRecommendations}>
        Get Recommendations
      </button>

      {result && (
        <div className="results">
          <h3>Recommended Schemes</h3>
          {result.recommended_schemes.map((s, i) => (
            <div key={i} className="scheme">
              <strong>{s.scheme_name}</strong>
              <p>Eligibility Score: {s.eligibility_score}</p>
              <p>{s.benefit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================
   Admin Dashboard
====================== */
function AdminDashboard({ token }) {
  const [schemes, setSchemes] = useState([]);

  const loadSchemes = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/admin/schemes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setSchemes(data);
  };

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      <button onClick={loadSchemes}>View All Schemes</button>

      {schemes.map((s, i) => (
        <p key={i}>{s.scheme_name}</p>
      ))}
    </div>
  );
}

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const checkEligibility = async () => {
    const res = await fetch("http://127.0.0.1:8000/eligibility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    navigate("/results", { state: { schemes: result.schemes } });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Check Eligibility</h2>

        <input
          placeholder="Age"
          onChange={(e) => setData({ ...data, age: +e.target.value })}
        />

        <input
          placeholder="Annual Income"
          onChange={(e) => setData({ ...data, income: +e.target.value })}
        />

        <input
          placeholder="Category (General/OBC/SC/ST)"
          onChange={(e) => setData({ ...data, category: e.target.value })}
        />

        <input
          placeholder="State"
          onChange={(e) => setData({ ...data, state: e.target.value })}
        />

        <input
          placeholder="Gender"
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        />

        <button onClick={checkEligibility}>
          Check Eligibility
        </button>
      </div>
    </div>
  );
}

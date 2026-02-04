import { useState } from "react";
import "../App.css";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    annual_income: "",
    category: "",
    state: "",
    city: "",
    area_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEligibility = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(formData.age),
          gender: formData.gender,
          annual_income: Number(formData.annual_income),
          category: formData.category,
          state: formData.state,
          city: formData.city,
          area_type: formData.area_type,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Eligibility could not be determined");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="card wide">
        <h2>Check Your Eligibility</h2>
        <p className="info-text">
          Eligibility is calculated based on the details you provide.
        </p>

        <form onSubmit={checkEligibility}>
          <input
            type="number"
            name="age"
            placeholder="Age *"
            required
            onChange={handleChange}
          />

          <select name="gender" required onChange={handleChange}>
            <option value="">Select Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            name="annual_income"
            placeholder="Annual Income (₹) *"
            required
            onChange={handleChange}
          />

          <select name="category" required onChange={handleChange}>
            <option value="">Select Category *</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="Minority">Minority</option>
          </select>

          <input
            name="state"
            placeholder="State *"
            required
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City *"
            required
            onChange={handleChange}
          />

          <select name="area_type" required onChange={handleChange}>
            <option value="">Area Type *</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>

          <button
            type="submit"
            className="check-eligibility-btn"
            disabled={loading}
          >
            {loading ? "Checking eligibility..." : "Check Eligibility"}
          </button>
        </form>

        {/* ERROR */}
        {error && <p className="error-text">{error}</p>}

        {/* RESULT */}
        {result && (
          <div className="results">
            <h3>Eligible Schemes</h3>

            {result.count === 0 ? (
              <p className="info-text">
                No schemes found based on the provided information.
              </p>
            ) : (
              <ul>
                {result.eligible_schemes.map((scheme, index) => (
                  <li key={index} className="scheme-card">
                    {scheme}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

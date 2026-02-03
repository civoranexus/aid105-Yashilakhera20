import { useState } from "react";

function Dashboard() {
  const [form, setForm] = useState({
    gender: "",
    age: "",
    category: "",
    state: "",
    city: "",
    income: ""
  });

  const [schemes, setSchemes] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: Number(form.age),
        income: Number(form.income),
        category: form.category,
        gender: form.gender,
        state: form.state
      })
    });

    const data = await res.json();
    setSchemes(data);
  };

  return (
    <section className="page slide-up">
      <h2>Check Your Eligibility</h2>
      <p className="subtitle">
        Fill the details below to find suitable government schemes
      </p>

      <form onSubmit={handleSubmit} className="form">
        {/* Gender */}
        <select name="gender" required onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          onChange={handleChange}
        />

        {/* Category */}
        <select name="category" required onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>

        {/* State */}
        <input
          type="text"
          name="state"
          placeholder="State"
          required
          onChange={handleChange}
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          onChange={handleChange}
        />

        {/* Income */}
        <input
          type="number"
          name="income"
          placeholder="Annual Income ( Rupees INR )"
          required
          onChange={handleChange}
        />

        <button type="submit">Check Schemes</button>
      </form>

      {/* Result */}
      {schemes.length > 0 && (
        <div className="results">
          <h3>Eligible Schemes</h3>

          {schemes.map((s, i) => (
            <div key={i} className="scheme-card">
              <strong>{s.name}</strong>
              <p>{s.description}</p>
              <small>Eligibility: {s.eligibility}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Dashboard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    mobile: "",
    alternate_mobile: "",
    email: "",
    dob: "",
    nationality: "India",
    aadhaar: "",
    state: "",
    city: "",
    area_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      alert("Registration successful. Please login.");
      navigate("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <h2>Create New Account</h2>

        <form onSubmit={handleSignup}>
          <input name="first_name" placeholder="First Name *" required onChange={handleChange} />
          <input name="middle_name" placeholder="Middle Name (Optional)" onChange={handleChange} />
          <input name="last_name" placeholder="Last Name *" required onChange={handleChange} />

          <input name="mobile" placeholder="Mobile Number *" required onChange={handleChange} />
          <input name="alternate_mobile" placeholder="Alternate Mobile (Optional)" onChange={handleChange} />

          <input type="email" name="email" placeholder="Email *" required onChange={handleChange} />
          <input type="date" name="dob" required onChange={handleChange} />

          <input name="aadhaar" placeholder="Aadhaar Number (12 digits) *" required onChange={handleChange} />

          <input name="state" placeholder="State *" required onChange={handleChange} />
          <input name="city" placeholder="City *" required onChange={handleChange} />

          <select name="area_type" required onChange={handleChange}>
            <option value="">Select Area Type *</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

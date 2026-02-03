import { useState } from "react";
import "../App.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    dob: "",
    nationality: "",
    state: "",
    city: "",
    areaType: "",
    locality: "",
    aadhaar: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.detail || "Registration failed");
      }
    } catch (err) {
      setError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="success-container">
        <h2>🎉 Registration Successful</h2>
        <p>Your details have been submitted successfully.</p>
        <p>You can now proceed to login.</p>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>New User Registration</h2>

        <input name="firstName" placeholder="First Name *" required onChange={handleChange} />
        <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name *" required onChange={handleChange} />
        <input name="mobile" placeholder="Mobile Number *" required onChange={handleChange} />
        <input name="alternateMobile" placeholder="Alternate Number (optional)" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email *" required onChange={handleChange} />
        <input type="date" name="dob" required onChange={handleChange} />

        <select name="nationality" required onChange={handleChange}>
          <option value="">Select Nationality *</option>
          <option value="India">India</option>
          <option value="Other">Other</option>
        </select>

        <input name="state" placeholder="State *" required onChange={handleChange} />
        <input name="city" placeholder="City *" required onChange={handleChange} />

        <select name="areaType" required onChange={handleChange}>
          <option value="">Urban / Rural *</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>

        <input name="locality" placeholder="Locality / Village *" required onChange={handleChange} />
        <input name="aadhaar" placeholder="Aadhaar Number *" required onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;

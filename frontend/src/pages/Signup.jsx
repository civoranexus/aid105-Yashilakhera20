import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import indiaData from "../data/indiaStatesCities.json";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    altPhone: "",
    email: "",
    dob: "",
    nationality: "",
    aadhaar: "",
    state: "",
    city: "",
    areaType: "",
    locality: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset city when state changes
    if (name === "state") {
      setForm({ ...form, state: value, city: "" });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const isValidAadhaar = (aadhaar) => /^[0-9]{12}$/.test(aadhaar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.nationality !== "India") {
      setError("Only Indian citizens are allowed to register.");
      return;
    }

    if (!isValidAadhaar(form.aadhaar)) {
      setError("Aadhaar must be a valid 12-digit number.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Signup failed");
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Server not reachable. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>
          New User <br /> Registration
        </h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name *" required onChange={handleChange} />
          <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name *" required onChange={handleChange} />

          <input name="phone" placeholder="Mobile Number *" required onChange={handleChange} />
          <input name="altPhone" placeholder="Alternate Number (optional)" onChange={handleChange} />

          <input type="email" name="email" placeholder="Email *" required onChange={handleChange} />
          <input type="date" name="dob" required onChange={handleChange} />

          <select name="nationality" required onChange={handleChange}>
            <option value="">Select Nationality *</option>
            <option value="India">India</option>
            <option value="Other">Other</option>
          </select>

          <input name="aadhaar" placeholder="Aadhaar Number *" required onChange={handleChange} />

          <select name="state" required value={form.state} onChange={handleChange}>
            <option value="">Select State *</option>
            {Object.keys(indiaData).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select name="city" required value={form.city} onChange={handleChange}>
            <option value="">Select City *</option>
            {form.state &&
              indiaData[form.state]?.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
          </select>

          <select name="areaType" required onChange={handleChange}>
            <option value="">Urban / Rural *</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>

          <input name="locality" placeholder="Locality / Area Name *" required onChange={handleChange} />

          <button type="submit">Register</button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Registration successful! Redirecting…</p>}

          <p className="note">
            All fields are mandatory (except middle & alternate number)
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
